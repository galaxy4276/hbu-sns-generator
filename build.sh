#!/bin/zsh
docker build \
    --platform linux/amd64 \
    --provenance=false \
    -t smartnewbie/sns-text-generator . || { echo "도커 빌드 실패"; exit 1; } \
&& docker tag smartnewbie/sns-text-generator:latest 565393029823.dkr.ecr.ap-northeast-2.amazonaws.com/smartnewbie/sns-text-generator:latest || { echo "도커 태그 실패"; exit 1; } \
&& docker push 565393029823.dkr.ecr.ap-northeast-2.amazonaws.com/smartnewbie/sns-text-generator:latest || { echo "도커 푸시 실패"; exit 1; }
