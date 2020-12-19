import { ipcRenderer } from 'electron';
import log from 'electron-log';

import { CHANNEL_SEND_COMMAND, CHANNEL_ALARM_STATE_CHANGED, CHANNEL_GET_INITIAL_ALARAM_STATE } from '@shared/constants';
import { Command, AlarmArmedState } from '@shared/models';

import { setArmedStatus, setArmedPending, setAlarmTriggered } from '@app/redux/actions/armed';
import { ConfigService } from '@app/services/config';
import { StandByService } from '@app/services/stand-by';

class AlarmService {
  init(): void {
    this.listenToStateChangesFromServer();
    this.forceMainThreadToSendInitialState();
  }

  disarm(code: string): boolean {
    if (code === ConfigService.config.code) {
      this.sendCommand('DISARM');
      return true;
    }
    return false;
  }

  armHome(): void {
    this.sendCommand('ARM_HOME');
  }

  armAway(): void {
    this.sendCommand('ARM_AWAY');
  }

  private forceMainThreadToSendInitialState(): void {
    log.debug('Forcing main thread to send initial state.');
    ipcRenderer.send(CHANNEL_GET_INITIAL_ALARAM_STATE);
  }

  private sendCommand(command: Command): void {
    log.debug('Sending command to main thread:', command);
    ipcRenderer.send(CHANNEL_SEND_COMMAND, command);
  }

  private listenToStateChangesFromServer(): void {
    ipcRenderer.on(CHANNEL_ALARM_STATE_CHANGED, (event, alarmState: AlarmArmedState, data?: any) => {
      log.debug('Status received from main thread:', alarmState, data);
      this.updateArmedStatus(alarmState, data);
      StandByService.disableStandBy();
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
        setAlarmTriggered(data);
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