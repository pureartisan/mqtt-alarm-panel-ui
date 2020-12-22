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
