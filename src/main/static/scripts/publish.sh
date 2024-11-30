#!/bin/bash

set -e pipefail

echo "Publishing npm to https://artifactory.opintopolku.fi/"

CURRENT_PATH=$(pwd)

cp package.json build
cp package-lock.json build

cd build

echo "//artifactory.opintopolku.fi/:_authToken=${NPM_TOKEN}" > .npmrc
echo "registry=https://artifactory.opintopolku.fi/artifactory/repository/oph-opintopolku-npm/" >> .npmrc
echo "always-auth=true" >> .npmrc
echo "email=noreply@opintopolku.fi" >> .npmrc

npm config set _auth $NPM_TOKEN
npm publish --access public
cd $CURRENT_PATH