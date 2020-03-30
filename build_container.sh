#!/usr/bin/env bash
set -e

npm install && npm run build && docker create . -t homewizard-smartwares-proxy-mqtt
