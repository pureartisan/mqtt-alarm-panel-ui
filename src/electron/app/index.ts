import { BrowserWindow } from 'electron';
import log, { LogLevel } from 'electron-log';

import { ConfigService } from '@electron/services/config';
import { MqttService } from '@electron/services/mqtt';

const setLogLevel = (): void => {
  log.transports.file.level = ConfigService.config.log_level;
};

// Before the browser window is loaded
export const preInitApp = (mainWindow: BrowserWindow) => {
  ConfigService.init();
  setLogLevel();
};

// After the browser window is full loaded
export const postInitApp = (mainWindow: BrowserWindow) => {
  MqttService.init(mainWindow);
};
