#!/bin/sh

set -x

echo -n "Building docker image"
docker build -t iisa/internet-archive .

echo -n "Running image now"
docker run -p 3000:3000 iisa/internet-archive
