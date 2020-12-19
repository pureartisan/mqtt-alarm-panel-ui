# mqtt-alarm-panel-ui

MQTT Alarm Panel UI using Electron (UI written React/Typescript).

This panel is designed to work with the [Manual MQTT](https://www.home-assistant.io/integrations/manual_mqtt) integration in [Home Assitant](https://www.home-assistant.io/).

Originally inspired by the awesome [UI built on Android Things](https://community.home-assistant.io/t/mqtt-alarm-control-panel-for-raspberry-pi-and-android/26484).

## Why build another UI when there's already one?

* [Android Things](https://developer.android.com/things) is shutting down officially.
* Running Android Things on the raspberry pi meant, I couldn't setup any of my favourite Raspbian packages.
* The UI and functionality are slightly different to what I wanted.
* The UI can be extended by anyone with web development experience since it's just another web application (running on Electron).

NOTE: At the moment, this application doesn't support the additional features such as "Weather".

## Setup Instructions

Follow the software setup (here)[./docs/installation.md].
