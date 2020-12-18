import { TimeService } from '@app/services/time';
import { AlarmService } from '@app/services/alarm';
import { ConfigService } from '@app/services/config';

class AppInitialiser {
  init () {
    TimeService.init();
    AlarmService.init();
    ConfigService.init();
  }
}

const singleton = new AppInitialiser();

export {
    singleton as AppInitialiser
};