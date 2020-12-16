import { ipcMain } from 'electron';

// TESTING
// =================================
ipcMain.on('asynchronous-message', (event: any, arg: any) => {
  // prints "ping"
  console.log(arg); // tslint:disable-line no-console
  event.reply('asynchronous-reply', 'pong');
});

ipcMain.on('synchronous-message', (event: any, arg: any) => {
  // prints "ping"
  console.log(arg); // tslint:disable-line no-console
  event.returnValue = 'pong';
});