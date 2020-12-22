# Installation

## TLDR;

// TODO

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

## Install electron dependencies

Since we are using Raspbian OS Lite (with a minimal GUI), electron (Chromium under the hood) may be missing some dependencies.

The common ones encountered installed using the command below:

```
sudo apt-get install -y \
  libatk1.0-0 \
  libnss3 \
  libatk-bridge2.0-0 \
  libgtk-3-0 \
```

For a full list of possible missing dependncies, please check (here)[
https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix].

It should be easy to install those missing packages one by one (or all at once) if you want to.

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

unclutter & ~/mqtt-alarm-panel-ui/mqtt-alarm-panel-ui
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
		"client_id": "mqtt-alarm-panel-ui", // MQTT client id
    "host": "192.168.178.225",          // MQTT broker host
    "port": "1883",                     // MQTT broke port
    "username": "my-mqtt-user",         // MQTT username, if applicable
    "password": "my-mqtt-password",     // MQTT password, if applicable
    "state_topic": "home/alarm",        // same as what is set in HA
    "command_topic": "home/alarm/set"   // same as what is set in HA
  },
  "ui": {
    "stand_by_screen_delay": 90,        // when to show the screensaver
		"siren_volume": 0.7,                // volume for siren
		"general_volume": 0.3,              // general UI feedback volume
		"general_volume_max": 1,            // max volume for feedback
    "code": "1234"                      // the verification code
  },
  "pending_time": 60,                   // same as what is set in HA
  "delay_time": 60,                     // same as what is set in HA
  "trigger_time": 600,                  // same as what is set in HA
  "log_level": "warn"                   // supported by `electron-log`
}
```

NOTE:
* Only the following properties are required, the others are optional. The default values are as above.
 * `mqtt.host`
 * `mqtt.port`
 * `mqtt.username` (only if applicable, otherwise leave it out)
 * `mqtt.password` (only if applicable, otherwise leave it out)
 * `ui.code` can be different from what is set in HA, since the logic is purely checked in the application
* Log levels correspond to log levels supported by (electron-log)[https://www.npmjs.com/package/electron-log] and defaults to `warn`.
 * `error`
 * `warn`
 * `info`
 * `verbose`
 * `debug`
 * `silly`