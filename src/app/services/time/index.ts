import { setCurrentTime } from '@app/redux/actions/time';

class TimeService {
  private now?: Date;
  private timeout?: number;

  init(): void {
    this.startClock();
  }

  private startClock(): void {
    // clear any previous initialised clocks
    this.stopClock();

    this.timeout = window.setInterval(() => {
      this.now = new Date();
      setCurrentTime(this.now);
    }, 1000);
  }

  private stopClock(): void {
    if (this.timeout) {
      window.clearInterval(this.timeout);
    }
    this.timeout = undefined;
  }

}

const singleton = new TimeService();

export {
  singleton as TimeService
};