#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd $DIR/../dist

echo "Removing exiting archives..."
rm -fv *.tar.gz

for f in ./*; do
  if [ -d "$f" ]; then
    echo "Archiving Starting... $f"
    cd $f
    tar -zcf "../${f%/}.tar.gz" .
    echo "Archiving DONE $f"
  fi
done