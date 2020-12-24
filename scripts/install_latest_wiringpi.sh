#!/bin/bash

cd /tmp

echo "Getting latest wiring pi installation package..."
wget https://project-downloads.drogon.net/wiringpi-latest.deb

echo "Installing"
sudo dpkg -i wiringpi-latest.deb

# print version
gpio -v