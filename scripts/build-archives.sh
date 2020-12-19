#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd $DIR/../dist

for f in ./*; do
  if [ -d "$f" ]; then
    echo "Archiving Starting... $f"
    cd $f
    tar -zcf "../${f%/}.tar.gz" .
    echo "Archiving DONE $f"
  fi
done