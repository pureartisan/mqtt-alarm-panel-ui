import { BrowserWindow } from 'electron';
import log from 'electron-log';

import { ConfigService } from '@electron/services/config';
import { MqttService } from '@electron/services/mqtt';
import { BuzzerService } from '@electron/services/buzzer';

const setLogLevel = (): void => {
  log.transports.file.level = ConfigService.config.log_level;
};

// Before the browser window is loaded
export const preInitApp = (mainWindow: BrowserWindow) => {
  ConfigService.init();
  setLogLevel();
  BuzzerService.init();
};

// After the browser window is full loaded
export const postInitApp = (mainWindow: BrowserWindow) => {
  log.debug('App ready');
  MqttService.init(mainWindow);
};
