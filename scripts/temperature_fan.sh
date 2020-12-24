#!/bin/bash

# Add this to /etc/fan-control/controller.sh
# Make sure the file is executable `sudo chmod 755 /etc/fan-control/controller.sh`
# Add the following to crontab `sudo nano /etc/cron.d/fan-control`
# `*/1 * * * * pi /etc/fan-control/controller.sh >/dev/null 2>&1`

TEMPERATURE_CUTOFF=48
GPIO_PIN=4 #use BCM pin 4

gpio -g mode $GPIO_PIN out

temp=$(vcgencmd measure_temp | egrep -o '[0-9]*\.[0-9]*')
tempInt=${temp%.*}

if [ $tempInt -gt $TEMPERATURE_CUTOFF ]
then
  gpio -g write $GPIO_PIN 1
else
  gpio -g write $GPIO_PIN 0
fi