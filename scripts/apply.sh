#!/bin/sh

yarn build
sleep 1
git add -A
git commit -m $1
git push -u
yarn publish
