#/bin/bash
#https://stackoverflow.com/a/17389526
echo ""
echo "---------- Iniziando zapzap"
echo ""
cd ..
export NODE_ENV=development;
export PORT=9999;
nohup node ./bin/www.js  > zapzap.log 2>&1 &
echo $! > save_pid.txt