#!/usr/bin/env bash
# Prepares a fresh Ubuntu 24.04 LTS server for Axione (DEC-012, DEC-013).
# Generic on purpose: no provider-specific API, so the host can change without rewriting it.
#
# Usage, as root on the new server:
#   DEPLOY_PUBLIC_KEY="ssh-ed25519 AAAA... deploy" bash provision.sh
#
# The script is idempotent: running it twice leaves the server in the same state.
set -euo pipefail

deploy_user="deploy"
deploy_key="${DEPLOY_PUBLIC_KEY:?DEPLOY_PUBLIC_KEY required (public key used by the deploy workflow)}"
started_at=$(date +%s)

export DEBIAN_FRONTEND=noninteractive

echo "==> System updates and base packages"
apt-get update -q
apt-get upgrade -yq
apt-get install -yq ca-certificates curl ufw unattended-upgrades fail2ban

echo "==> Automatic security updates"
dpkg-reconfigure -f noninteractive unattended-upgrades

echo "==> Docker Engine from the official repository"
if ! command -v docker > /dev/null; then
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  chmod a+r /etc/apt/keyrings/docker.asc
  # shellcheck disable=SC1091
  codename="$(. /etc/os-release && echo "$VERSION_CODENAME")"
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu ${codename} stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update -q
  apt-get install -yq docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi
systemctl enable --now docker

echo "==> Deploy user (SSH key only, member of the docker group)"
if ! id "$deploy_user" > /dev/null 2>&1; then
  adduser --disabled-password --gecos "" "$deploy_user"
fi
usermod -aG docker "$deploy_user"
install -d -m 700 -o "$deploy_user" -g "$deploy_user" "/home/${deploy_user}/.ssh"
authorized_keys="/home/${deploy_user}/.ssh/authorized_keys"
touch "$authorized_keys"
grep -qxF "$deploy_key" "$authorized_keys" || echo "$deploy_key" >> "$authorized_keys"
chown "$deploy_user:$deploy_user" "$authorized_keys"
chmod 600 "$authorized_keys"
install -d -m 750 -o "$deploy_user" -g "$deploy_user" /opt/axione

echo "==> SSH hardening (keys only, no root login)"
cat > /etc/ssh/sshd_config.d/10-axione.conf <<'SSHD'
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin no
SSHD
sshd -t
systemctl reload ssh

echo "==> Firewall: SSH, HTTP, HTTPS only"
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "==> Done in $(( $(date +%s) - started_at ))s."
echo "Next: create /opt/axione/<environment>/<environment>.env (see ops/env.example) as ${deploy_user}."
