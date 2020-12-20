import { TimeService } from '@app/services/time';
import { AlarmService } from '@app/services/alarm';
import { ConfigService } from '@app/services/config';
import { AudioService } from '@app/services/audio';

class AppInitialiser {
  init () {
    TimeService.init();
    AlarmService.init();
    ConfigService.init();
    AudioService.init();
  }
}

const singleton = new AppInitialiser();

export {
    singleton as AppInitialiser
};