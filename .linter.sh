#!/bin/bash
cd /tmp/kavia/workspace/code-generation/tictactoe-duel-1224-5d69b178/tictactoe_duel
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

