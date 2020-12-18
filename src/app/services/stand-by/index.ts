import { debounce } from 'lodash';

import { enableStandBy, disableStandBy } from '@app/redux/actions/stand-by';
import { ConfigService } from '@app/services/config';

const GLOBAL_INTERACTION_EVENTS: string[] = [
  'mousemove', 'scroll', 'keydown', 'click', 'touchstart'
];

const INTERACTION_DETECTION_DEBOUNCE_DELAY = 1000; // 1 sec

class StandByService {
  private standBy: boolean = false;
  private timeout?: number;

  enableStandBy(): void {
    this.standBy = true;
    enableStandBy();
  }

  disableStandBy(): void {
    this.standBy = false;
    disableStandBy();
  }

  listenToUserInteractions(): void {
    // ensure previously added listeners are removed
    this.stopListeningToUserInteractions();

    // listen to interactions
    GLOBAL_INTERACTION_EVENTS.forEach(eventName => {
      document.body.addEventListener(eventName, this.handleAnyUserInteraction);
    });

    // start timer
    this.resetStandByTimer();
  }

  stopListeningToUserInteractions(): void {
    GLOBAL_INTERACTION_EVENTS.forEach(eventName => {
      document.body.removeEventListener(eventName, this.handleAnyUserInteraction);
    });
  }

  // NOTE: 'debounce' since we don't want to trigger this multiple times very frequently
  private handleAnyUserInteraction = debounce(() => {
    this.resetStandByTimer();
  }, INTERACTION_DETECTION_DEBOUNCE_DELAY);

  private resetStandByTimer = () => {
    // already in stand by, then ignore
    if (this.standBy) {
      return;
    }

    // remove any clear timeouts
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      // enable stand by mode
      this.enableStandBy();
    }, this.getStandByDelay());
  };

  private getStandByDelay(): number {
    return ConfigService.config.stand_by_screen_delay * 1000;
  }

}

const singleton = new StandByService();

export {
  singleton as StandByService
};