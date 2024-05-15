#!/bin/sh
git fetch origin && git reset --hard origin/master && git clean -f -d && \
docker compose -f docker-compose.production.yml down && \
docker compose -f docker-compose.production.yml pull && \
docker compose -f docker-compose.production.yml up -d;