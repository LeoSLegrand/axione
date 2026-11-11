#!/usr/bin/env bash
# Deploys one image tag on the server, with automatic rollback (DEC-012).
# Usage: deploy.sh <environment> <image-tag>
# Expects /opt/axione/<environment>/<environment>.env (see ops/env.example), which defines
# POSTGRES_PASSWORD, SITE_ADDRESS and IMAGE_REPOSITORY (for example ghcr.io/owner).
set -euo pipefail

environment="${1:?environment required}"
tag="${2:?image tag required}"
app_dir="/opt/axione/${environment}"
env_file="${app_dir}/${environment}.env"
project="axione-${environment}"

cd "$app_dir"
# shellcheck disable=SC1090
set -a && source "$env_file" && set +a

compose() {
  docker compose -p "$project" --env-file "$env_file" -f compose.prod.yaml "$@"
}

release() {
  export WEB_IMAGE="${IMAGE_REPOSITORY}/axione-web:$1"
  export MIGRATE_IMAGE="${IMAGE_REPOSITORY}/axione-migrate:$1"
  compose pull web migrate
  # migrate runs first (depends_on), then web must become healthy behind Caddy.
  compose up -d --wait --wait-timeout 180
  curl --fail --silent --show-error --max-time 10 "https://${SITE_ADDRESS}/api/health" > /dev/null
}

previous="$(cat current_tag 2>/dev/null || true)"
started_at=$(date +%s)

if release "$tag"; then
  echo "$tag" > current_tag
  echo "Deployed ${tag} to ${environment} in $(( $(date +%s) - started_at ))s."
else
  echo "Deployment of ${tag} failed." >&2
  if [[ -n "$previous" && "$previous" != "$tag" ]]; then
    echo "Rolling back to ${previous}." >&2
    release "$previous"
  fi
  exit 1
fi
