import { TimeService } from '@app/services/time';
import { AlarmService } from '@app/services/alarm';

class AppInitialiser {
  init () {
    TimeService.init();
    AlarmService.init();
  }
}

const singleton = new AppInitialiser();

export {
    singleton as AppInitialiser
};