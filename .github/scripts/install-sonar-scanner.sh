#!/usr/bin/env bash
# Installs the SonarScanner CLI into the runner tool cache, where sonarqube-scan-action finds it
# and skips its own download. The archive is verified against the SonarSource public key pinned in
# .github/keys/sonarsource.asc, so no keyserver is contacted (the action's keyserver lookup has no
# timeout and can hang the job). Every network call is bounded.
#
# Usage: SONAR_SCANNER_VERSION=8.3.1.16491 .github/scripts/install-sonar-scanner.sh
set -euo pipefail

version="${SONAR_SCANNER_VERSION:?SONAR_SCANNER_VERSION required}"
fingerprint="679F1EE92B19609DE816FDE81DB198F93525EC1A"
flavor="linux-x64"
base_url="https://binaries.sonarsource.com/Distribution/sonar-scanner-cli"
archive="sonar-scanner-cli-${version}-${flavor}.zip"
key_file="$(dirname "$0")/../keys/sonarsource.asc"

# Same layout as @actions/tool-cache: <tool>/<semver>/<arch> plus a "<arch>.complete" marker.
IFS=. read -r major minor patch build <<< "$version"
tool_dir="${RUNNER_TOOL_CACHE:?}/sonar-scanner-cli/${major}.${minor}.${patch}-build.${build}/${flavor}"

if [[ -f "${tool_dir}.complete" ]]; then
  echo "SonarScanner ${version} already in the tool cache."
  exit 0
fi

work="$(mktemp -d)" # left in place: GitHub runners are discarded after the job
export GNUPGHOME="${work}/gnupg"
mkdir "$GNUPGHOME" && chmod 700 "$GNUPGHOME"

curl -fsSL --retry 3 --connect-timeout 10 --max-time 120 -o "${work}/${archive}" "${base_url}/${archive}"
curl -fsSL --retry 3 --connect-timeout 10 --max-time 30 -o "${work}/${archive}.asc" "${base_url}/${archive}.asc"

gpg --batch --quiet --import "$key_file"
# VALIDSIG ends with the primary key fingerprint, even when a subkey made the signature.
if ! gpg --batch --status-fd 1 --verify "${work}/${archive}.asc" "${work}/${archive}" 2> /dev/null \
  | grep -Eq "^\[GNUPG:\] VALIDSIG .* ${fingerprint}$"; then
  echo "Signature verification failed for ${archive}." >&2
  exit 1
fi
echo "Signature of ${archive} verified with key ${fingerprint}."

unzip -q "${work}/${archive}" -d "$work"
mkdir -p "$(dirname "$tool_dir")"
mv "${work}/sonar-scanner-${version}-${flavor}" "$tool_dir"
touch "${tool_dir}.complete"
echo "SonarScanner ${version} installed in ${tool_dir}."
