#/bin/sh

docker run --rm\
    -v $(pwd):/app \
    -p 8800:8000 \
    --name zap \
    zapzap \
    npm install