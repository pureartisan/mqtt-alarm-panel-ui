import { ipcRenderer } from 'electron';
import log from 'electron-log';

import { CHANNEL_CONNECTION_STATUS, CHANNEL_GET_CONNECTION_STATUS } from '@shared/constants';

import { setConnectionStatus } from '@app/redux/actions/connection';

class ConnectionService {

  init(): void {
    this.getStatusFromMainThread();
    this.listenToStatusUpdatesFromMainThread();
  }

  private getStatusFromMainThread(): void {
    log.debug('Getting status from main thread');
    const status: boolean = ipcRenderer.sendSync(CHANNEL_GET_CONNECTION_STATUS);
    setConnectionStatus(status);
  }

  private listenToStatusUpdatesFromMainThread(): void {
    ipcRenderer.on(CHANNEL_CONNECTION_STATUS, (event, status: boolean) => {
      log.debug('Connection status received from main thread:', status);
      setConnectionStatus(status);
    });
  }

}

const singleton = new ConnectionService();

export { singleton as ConnectionService };