import { ipcRenderer } from 'electron';

import { TimeService } from '@app/services/time';

class AppInitialiser {
  init () {
    TimeService.init();


    // TESTING
    // prints "pong"
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping'));   // tslint:disable-line no-console

    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      // prints "pong"
      console.log(arg); // tslint:disable-line no-console
    });
    ipcRenderer.send('asynchronous-message', 'ping');
  }
}

const singleton = new AppInitialiser();

export {
    singleton as AppInitialiser
};