import { app, BrowserWindow, screen } from 'electron';
import log from 'electron-log';

import { IS_PI } from '@electron/utils/device';
import { Info } from '@electron/info';

let mainWindow: BrowserWindow | null;

const DEV_MODE = process.env.NODE_ENV === 'development';

function createWindow(): void {
  log.info('Version [Main]:', `${Info.name} ${Info.version}`);

  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  log.debug(`Screen size: ${width}x${height}`);

  mainWindow = new BrowserWindow({
    width,
    height,
    show: false, // hide by default (until we are ready)
    webPreferences: {
      // https://stackoverflow.com/questions/55093700/electron-5-0-0-uncaught-referenceerror-require-is-not-defined#66604710
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });

  let entryUrl: string;

  if (DEV_MODE) {
    entryUrl = 'http://localhost:4000';
    mainWindow.webContents.openDevTools();
  } else {
    entryUrl = `file://${__dirname}/index.html`;
  }

  mainWindow.loadURL(entryUrl);

  // load the main app logic
  const { preInitApp, postInitApp } = require('./app');
  preInitApp(mainWindow);

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    if (!mainWindow) {
      return;
    }

    // only make the app go full screen on the Rpi
    if (IS_PI) {
      mainWindow.setFullScreen(true);
    }
    mainWindow.setMenuBarVisibility(false);
    mainWindow.show();

    // Open the DevTools automatically if developing
    if (DEV_MODE) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.webContents.once('did-finish-load', () => {
    postInitApp(mainWindow);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;
