#!/bin/bash
cd src/main/static && npm run build
cd ../../../
docker build . -t virkailija-raamit-nginx
docker run -p 8080:80 -it virkailija-raamit-nginx