#/bin/bash

echo "---------- Parando zapzap"
echo ""
kill -9 `cat save_pid.txt`
rm save_pid.txt