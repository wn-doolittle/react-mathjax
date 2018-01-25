#!/bin/bash
# Builds, commits, and pushes

set -e # Exit immediately if a command exits with a non-zero status.
set -u # Treat unset variables as an error when substituting.

npm run build
git add .
git commit -m "update"
git push
