#!/bin/sh

curl --location 'localhost:9999/message' \
--header 'Content-Type: application/json' \
--data '{
    "body": "Ola",
    "from": "rodnei"
}'