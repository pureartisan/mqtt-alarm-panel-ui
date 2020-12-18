import { BrowserWindow } from 'electron';

import { ConfigService } from '@electron/services/config';
import { MqttService } from '@electron/services/mqtt';

// Before the browser window is loaded
export const preInitApp = (mainWindow: BrowserWindow) => {
  ConfigService.init();
};

// After the browser window is full loaded
export const postInitApp = (mainWindow: BrowserWindow) => {
  MqttService.init(mainWindow);
};
