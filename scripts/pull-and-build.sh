#!/bin/bash

echo "Pulling latest changes from git..."
git pull

echo "Going to src directory..."
cd src

echo "Building project..."
qmake
make
