import { ipcMain, BrowserWindow } from 'electron';
import log from 'electron-log';
import { MqttClient, connect as mqttConnect, IClientOptions } from 'mqtt';

import {
  CHANNEL_ALARM_STATE_CHANGED,
  CHANNEL_SEND_COMMAND,
  CHANNEL_GET_INITIAL_ALARAM_STATE,
  CHANNEL_CONNECTION_STATUS,
  CHANNEL_GET_CONNECTION_STATUS
} from '@shared/constants';
import { Command, AlarmArmedState } from '@shared/models';

import { ConfigService } from '@electron/services/config';

const RECONNECT_DELAY = 10000; // 10 seconds

class MqttService {
  private mqttClient?: MqttClient;
  private mainWindow?: BrowserWindow;
  private lastAlarmState?: AlarmArmedState;
  private reconnectTimeout?: NodeJS.Timeout;

  init(mainWindow: BrowserWindow): void {
    this.mainWindow = mainWindow;
    this.connectToBroker();
    this.listenToCommandsFromRenderer();
  }

  private listenToCommandsFromRenderer(): void {
    ipcMain.on(CHANNEL_SEND_COMMAND, (event, command: Command) => {
      if (command) {
        this.publishCommandTopic(command);
      }
    });
    ipcMain.on(CHANNEL_GET_INITIAL_ALARAM_STATE, () => {
      if (this.lastAlarmState) {
        this.handleStateChanged(this.lastAlarmState);
      }
    });
    ipcMain.on(CHANNEL_GET_CONNECTION_STATUS, (event) => {
      event.returnValue = Boolean(this.mqttClient?.connected);
    });
  }

  private connectToBroker(): void {
    const brokerUrl = `mqtt://${ConfigService.config.mqtt.host}:${ConfigService.config.mqtt.port}`;
    const opts: IClientOptions = {
      clientId: this.getUniqueClientId()
    };
    if (ConfigService.config.mqtt.username) {
      opts.username = ConfigService.config.mqtt.username;
      opts.password = ConfigService.config.mqtt.password;
    }

    log.debug('Connecting to MQTT broker on', brokerUrl, (opts.username ? 'with auth' : 'NO auth'));
    this.mqttClient = mqttConnect(brokerUrl, opts);
    this.mqttClient.on('connect', () => {
      this.subscribeToStateTopic();
      this.sendConnectionStatusToRenderer(true);
    });
    this.mqttClient.on('message', (t, msg) => this.handleIncomingMessage(t, msg));
    this.mqttClient.on('error', (err) => console.error(err));
    this.mqttClient.on('close', () => {
      log.debug("MQTT connection closed");
      this.mqttClient?.end();
      this.mqttClient = undefined;
      this.sendConnectionStatusToRenderer(false);
      this.reconnectToMqttBrokerWithDelay();
    });
  }

  private subscribeToStateTopic(): void {
    const stateTopic = ConfigService.config.mqtt.state_topic;
    log.debug('Subscribing to state topic:', stateTopic);
    this.mqttClient?.subscribe(stateTopic, (error) => {
      if (error) {
        console.error(`Subscring to state topic ${stateTopic} failed.`, error);
      }
    });
  }

  private handleIncomingMessage(topic: string, message: Buffer): void {
    const msg = message.toString();
    log.debug('MQTT message received:', topic, msg);
    if (topic === ConfigService.config.mqtt.state_topic) {
      this.handleStateChanged(msg as AlarmArmedState);
    }
  }

  private publishCommandTopic(command: Command): void {
    const commandTopic = ConfigService.config.mqtt.command_topic;
    log.debug('Publishing command topic:', commandTopic, command);
    this.mqttClient?.publish(commandTopic, command);
  }

  private handleStateChanged(state: AlarmArmedState): void {
    let data = undefined;
    if (state === "pending") {
      data = ConfigService.config.pending_time;
    } else if (state === "triggered") {
      data = ConfigService.config.trigger_time;
    }
    // remember the last state
    this.lastAlarmState = state;
    this.sendDataToRenderer(CHANNEL_ALARM_STATE_CHANGED, state, data);
  }

  private reconnectToMqttBrokerWithDelay(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    this.reconnectTimeout = setTimeout(() => {
      log.debug('Reconnecting to MQTT broker...');
      this.connectToBroker();
    }, RECONNECT_DELAY);
  }

  private getUniqueClientId(): string {
    const uid = Math.random().toString(16).substr(2, 8);
    return `${ConfigService.config.mqtt.client_id}_${uid}`;
  }

  private sendDataToRenderer(channel: string, ...args: any[]): void {
    this.mainWindow?.webContents.send(channel, ...args);
  }

  private sendConnectionStatusToRenderer(status: boolean): void {
    this.sendDataToRenderer(CHANNEL_CONNECTION_STATUS, status);
  }
}

const singleton = new MqttService();

export { singleton as MqttService };