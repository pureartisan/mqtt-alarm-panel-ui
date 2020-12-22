# Installation

## TLDR;

* Install the following pre-requisites:
** Node

## Installing Raspbian OS (64-bit)

// TODO

## Install Node

Follow instructions from Debian NodeSource:

https://github.com/nodesource/distributions#debinstall

NOTE: Make sure you run this as `root` using (`sudo su`)


## Running on your dev machine

The renderer and main threads need to be run in two separate consoles.

Renderer:
```
npm run dev:react
```

Main thread:
```
npm run dev:electron
```

## Build the Distribution

Due to an issue with FPM on 64-bit, I had to setup Ruby/GEM and use a working version of FPM. I used this [workaround](https://github.com/electron-userland/electron-builder/issues/3901#issuecomment-499121694)

Install Ruby/Gem:
```
sudo apt-get install -y ruby ruby-dev rubygems build-essential
```

Install FPM:
```
sudo gem install --no-document fpm
```