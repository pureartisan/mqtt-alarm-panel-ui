import { ArmedStatus, setArmedStatus } from '@app/redux/actions/armed';

class AlarmService {
  disarm(code: string): void {
    // TODO check code
    setArmedStatus(null);
  }

  armHome(): void {
    setArmedStatus('arm_home');
  }

  armAway(): void {
    setArmedStatus('arm_away');
  }

  armNight(): void {
    setArmedStatus('arm_night');
  }
}

const singleton = new AlarmService();

export {
  singleton as AlarmService
};