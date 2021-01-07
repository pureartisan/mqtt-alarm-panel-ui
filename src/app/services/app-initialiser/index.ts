import log from 'electron-log';

import { Info } from '@app/info';

import { TimeService } from '@app/services/time';
import { AlarmService } from '@app/services/alarm';
import { ConfigService } from '@app/services/config';
import { AudioService } from '@app/services/audio';
import { ConnectionService } from '@app/services/connection';

class AppInitialiser {
  init () {
    this.logVersion();
    TimeService.init();
    AlarmService.init();
    ConfigService.init();
    AudioService.init();
    ConnectionService.init();
  }

  private logVersion(): void {
    log.info('Version [Renderer]:', `${Info.name} ${Info.version}`);
  }
}

const singleton = new AppInitialiser();

export {
    singleton as AppInitialiser
};