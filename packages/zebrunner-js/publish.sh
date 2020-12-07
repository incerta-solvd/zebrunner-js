#!/bin/bash
npm i
npm run build

# Test on usage example before publishing
cd ../../examples/direct-API-calls || exit 1
npm test || exit 1

# Publish (the new version of the package should be set manually)
cd ../../packages/zebrunner-js || exit 1
npm publish
