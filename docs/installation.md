# Installation

## TLDR;

* Install the following pre-requisites:
** Node

## Installing Raspbian OS (64-bit)

// TODO

## Install Minimal GUI support

```
sudo apt-get install -y --no-install-recommends \
  xserver-xorg-video-all \
  xserver-xorg-input-all \
  xserver-xorg-core \
  xinit \
  x11-xserver-utils \
  unclutter
```

## Install Node

Follow instructions from Debian NodeSource:

https://github.com/nodesource/distributions#debinstall

NOTE: Make sure you run this as `root` using (`sudo su`)

## Install the application

// TODO

## Setup Autorun Application

### Auto-login using `raspbi-config`

// TODO

### Run GUI on start up

Edit the `~/.bash_profile` file and add the following.

NOTE: We only want to run the GUI if we are not logging in via SSH.

```
if [ -z $DISPLAY ] && [ $(tty) = /dev/tty1 ]
then
  startx
fi
```

### Run application when GUI starts

Edit/add the file `~/.xinitrc` and add the following:

```
#!/usr/bin/env sh
xset -dpms
xset s off
xset s noblank

#unclutter &
# foobar
```

## Configuration

The application will try to load the config file from the following locations (in the given order):

* `./config.json`
* `~/.mqtt-alarm-panel-ui/config.json`
* `/etc/mqtt-alarm-panel-ui/config.json`

The config file must be a valid JSON file, with the following information.

```
{
  "mqtt": {
    "host": "192.168.178.225",          // MQTT broker host
    "port": "1883",                     // MQTT broke port
    "username": "my-mqtt-user",         // MQTT username, if applicable
    "password": "my-mqtt-password",     // MQTT password, if applicable
    "state_topic": "home/alarm",        // same as what is set in HA
    "command_topic": "home/alarm/set"   // same as what is set in HA
  },
  "ui": {
    "stand_by_screen_delay": 90,        // when to show the screensaver
    "code": "1234"                      // the verification code
  },
  "pending_time": 60,                   // same as what is set in HA
  "delay_time": 60,                     // same as what is set in HA
  "trigger_time": 600                   // same as what is set in HA
}
```

NOTE:
* Only the following properties are required, the others are optional. The default values are as above.
 * `mqtt.host`
 * `mqtt.port`
 * `mqtt.username` (only if applicable, otherwise leave it out)
 * `mqtt.password` (only if applicable, otherwise leave it out)
 * `ui.code` can be different from what is set in HA, since the logic is purely checked in the application
