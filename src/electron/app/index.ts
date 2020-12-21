import { BrowserWindow } from 'electron';
import log from 'electron-log';

import { ConfigService } from '@electron/services/config';
import { MqttService } from '@electron/services/mqtt';
import { Info } from '@electron/info';

const setLogLevel = (): void => {
  log.transports.file.level = ConfigService.config.log_level;
};

const logVersion = (): void => {
  log.info('Version [Main]:', `${Info.name} ${Info.version}`);
};

// Before the browser window is loaded
export const preInitApp = (mainWindow: BrowserWindow) => {
  ConfigService.init();
  setLogLevel();
};

// After the browser window is full loaded
export const postInitApp = (mainWindow: BrowserWindow) => {
  logVersion();
  MqttService.init(mainWindow);
};
