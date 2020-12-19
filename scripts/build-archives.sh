#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd $DIR/../dist

for i in ./;
  do tar -zcvf "${i%/}.tar.gz" "$i";
done
