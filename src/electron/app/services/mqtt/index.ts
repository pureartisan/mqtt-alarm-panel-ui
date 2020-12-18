import { ipcMain, BrowserWindow } from 'electron';
import { MqttClient, connect as mqttConnect, IClientOptions } from 'mqtt';

import { CHANNEL_ALARM_STATE_CHANGED, CHANNEL_SEND_COMMAND } from '@shared/constants';
import { Command, AlarmArmedState } from '@shared/models';

import { ConfigService } from '@electron/services/config';

class MqttService {
  private mqttClient?: MqttClient;
  private mainWindow?: BrowserWindow;

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
  }

  private connectToBroker(): void {
    const brokerUrl = `mqtt://${ConfigService.config.mqtt.host}:${ConfigService.config.mqtt.port}`;
    const opts: IClientOptions = {};
    if (ConfigService.config.mqtt.username) {
      opts.username = ConfigService.config.mqtt.username;
      opts.password = ConfigService.config.mqtt.password;
    }

    console.debug('Connecting to MQTT broker on', brokerUrl, (opts.username ? 'with auth' : 'NO auth'));
    this.mqttClient = mqttConnect(brokerUrl, opts);
    this.mqttClient.on('connect', () => this.subscribeToStateTopic());
    this.mqttClient.on('message', (t, msg) => this.handleIncomingMessage(t, msg));
    this.mqttClient.on('error', (err) => console.error(err));
    this.mqttClient.on('close', () => {
      console.debug("MQTT connection closed");
      this.mqttClient?.end();
    });
  }

  private subscribeToStateTopic(): void {
    const stateTopic = ConfigService.config.mqtt.state_topic;
    console.debug('Subscribing to state topic:', stateTopic);
    this.mqttClient?.subscribe(stateTopic, (error) => {
      if (error) {
        console.error(`Subscring to state topic ${stateTopic} failed.`, error);
      }
    });
  }

  private handleIncomingMessage(topic: string, message: Buffer): void {
    const msg = message.toString();
    console.debug('MQTT message received:', topic, msg);
    if (topic === ConfigService.config.mqtt.state_topic) {
      this.handleStateChanged(msg as AlarmArmedState);
    }
  }

  private publishCommandTopic(command: Command): void {
    const commandTopic = ConfigService.config.mqtt.command_topic;
    console.debug('Publishing command topic:', commandTopic, command);
    this.mqttClient?.publish(commandTopic, command);
  }

  private handleStateChanged(state: AlarmArmedState): void {
    let data = undefined;
    if (state === "pending") {
      data = ConfigService.config.pending_time;
    }
    this.mainWindow?.webContents.send(CHANNEL_ALARM_STATE_CHANGED, state, data);
  }
}

const singleton = new MqttService();

export { singleton as MqttService };