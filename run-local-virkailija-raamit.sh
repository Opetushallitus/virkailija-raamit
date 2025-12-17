#!/bin/bash
cd src/main/static && pnpm run build
cd ../../../
docker build . -t virkailija-raamit-nginx
docker run -p 8080:80 --rm --name virkailija-raamit-nginx-local -it virkailija-raamit-nginx
