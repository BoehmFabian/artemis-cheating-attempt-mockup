#!/usr/bin/env bash
set -euo pipefail

# Publish this standalone mockup directory to its GitHub repository. The script
# uses a temporary clone, so it never commits or pushes the seminar workspace.

SOURCE_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPOSITORY="${GITHUB_REPOSITORY:-BoehmFabian/artemis-cheating-attempt-mockup}"
COMMIT_MESSAGE="${COMMIT_MESSAGE:-Update Artemis cheating-attempt mockup}"
DRY_RUN=false

if [[ "${1:-}" == "--dry-run" ]]; then
    DRY_RUN=true
elif [[ $# -gt 0 ]]; then
    printf 'Usage: %s [--dry-run]\n' "$0" >&2
    exit 2
fi

for command in gh git rsync; do
    if ! command -v "$command" >/dev/null 2>&1; then
        printf 'Required command not found: %s\n' "$command" >&2
        exit 1
    fi
done

gh auth status --hostname github.com >/dev/null
if ! gh repo view "$REPOSITORY" --json name >/dev/null 2>&1; then
    printf 'GitHub repository not found or not accessible: %s\n' "$REPOSITORY" >&2
    exit 1
fi

TEMP_BASE="${TMPDIR:-/tmp/opencode}"
if [[ ! -d "$TEMP_BASE" ]]; then
    TEMP_BASE="/tmp"
fi
WORK_ROOT="$(mktemp -d "$TEMP_BASE/artemis-mockup-upload.XXXXXX")"
cleanup() {
    rm -rf -- "$WORK_ROOT"
}
trap cleanup EXIT

CLONE_DIR="$WORK_ROOT/repository"
gh repo clone "$REPOSITORY" "$CLONE_DIR" >/dev/null

# Replace the clone's tracked/untracked content with this directory while
# preserving the clone's .git metadata and remote configuration.
rsync -a --delete --exclude='.git/' "$SOURCE_DIR/" "$CLONE_DIR/"

git -C "$CLONE_DIR" add --all
if git -C "$CLONE_DIR" diff --cached --quiet; then
    printf 'No changes to upload; %s is already up to date.\n' "$REPOSITORY"
    exit 0
fi

if [[ "$DRY_RUN" == true ]]; then
    printf 'Dry run: these changes would be uploaded to %s:\n' "$REPOSITORY"
    git -C "$CLONE_DIR" diff --cached --stat
    exit 0
fi

LOGIN="$(gh api user --jq .login)"
NAME="$(gh api user --jq '.name // .login')"
EMAIL="$(gh api user --jq '.email // empty')"
if [[ -z "$EMAIL" ]]; then
    EMAIL="${LOGIN}@users.noreply.github.com"
fi

git -C "$CLONE_DIR" config user.name "$NAME"
git -C "$CLONE_DIR" config user.email "$EMAIL"
git -C "$CLONE_DIR" commit -m "$COMMIT_MESSAGE"
git -C "$CLONE_DIR" push origin HEAD

printf 'Uploaded mockup to https://github.com/%s\n' "$REPOSITORY"
