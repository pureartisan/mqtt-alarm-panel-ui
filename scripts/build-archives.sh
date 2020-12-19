#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd $DIR/../dist

for f in ./*; do
  if [ -d "$f" ]; then
    tar -zcvf "${f%/}.tar.gz" "$f";
  fi
done