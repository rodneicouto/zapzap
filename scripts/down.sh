#/bin/bash

echo "---------- Parando zapzap"
echo ""
cd ..
kill -9 `cat save_pid.txt`
rm save_pid.txt
ps auxww | grep -E "zapzap" | awk '{print $2}' | xargs kill -9