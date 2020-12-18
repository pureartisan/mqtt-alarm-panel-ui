import { ipcRenderer } from 'electron';

import { CHANNEL_SEND_COMMAND, CHANNEL_ALARM_STATE_CHANGED } from '@shared/constants';
import { Command, AlarmArmedState } from '@shared/models';

import { setArmedStatus, setArmedPending } from '@app/redux/actions/armed';

class AlarmService {
  init(): void {
    this.listenToStateChangesFromServer();
  }

  disarm(code: string): void {
    // TODO check code
    this.sendCommand('DISARM');
  }

  armHome(): void {
    this.sendCommand('ARM_HOME');
  }

  armAway(): void {
    this.sendCommand('ARM_AWAY');
  }

  private sendCommand(command: Command): void {
    console.log('Sending command to main thread:', command);
    ipcRenderer.send(CHANNEL_SEND_COMMAND, command);
  }

  private listenToStateChangesFromServer(): void {
    ipcRenderer.on(CHANNEL_ALARM_STATE_CHANGED, (event, alarmState: AlarmArmedState, data?: any) => {
      console.log('Status received from main thread:', alarmState, data);
      this.updateArmedStatus(alarmState, data);
    });
  }

  private updateArmedStatus(alarmState: AlarmArmedState, data?: any): void {
    switch (alarmState) {
      case 'disarmed':
        setArmedStatus(null);
        return;
      case 'armed_home':
      case 'armed_night':
        setArmedStatus('armed_home');
        return;
      case 'armed_away':
        setArmedStatus('armed_away');
        return;
      case 'triggered':
        setArmedStatus('triggered');
        return;
      case 'pending':
        setArmedPending(data);
        return;
    }
  }
}

const singleton = new AlarmService();

export {
  singleton as AlarmService
};