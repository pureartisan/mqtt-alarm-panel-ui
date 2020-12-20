import { readFileSync, existsSync } from 'fs';
import { homedir } from 'os';
import { resolve as pathResolve } from 'path';
import { ipcMain } from 'electron';
import log, { LogLevel } from 'electron-log';

import { CHANNEL_GET_CONFIG } from '@shared/constants';
import { UiConfig } from '@shared/models';

const CONFIG_PATHS = [
  pathResolve('./config.json'),
  pathResolve(homedir(), '.mqtt-alarm-panel-ui/config.json'),
  pathResolve('/etc/mqtt-alarm-panel-ui/config.json')
];

interface Config {
  ui: UiConfig
  mqtt: {
    host?: string
    port: string
    username?: string
    password?: string
    state_topic: string
    command_topic: string
  }
  pending_time?: number
  delay_time?: number
  trigger_time?: number
  log_level: LogLevel
}

const DEFAULT_CONFIG: Config = {
  mqtt: {
    port: '1883',
    state_topic: 'home/alarm',
    command_topic: 'home/alarm/set'
  },
  ui: {
    stand_by_screen_delay: 90,
    siren_volume: 0.7,
    code: ''
  },
  pending_time: 60,
  delay_time: 60,
  trigger_time: 600,
  log_level: 'info'
};

class ConfigService {
  private conf: Config = {
    ...DEFAULT_CONFIG
  } as Config;
  private confPath: string | null = null;

  init(): void {
    this.loadConfig();
    this.validateMqttConfig();
    this.listenToCommandsFromRenderer();
  }

  get config(): Config {
    return this.conf;
  }

  private loadConfig(): void {
    this.confPath = null;
    for (let i=0; i < CONFIG_PATHS.length; i++) {

      const configPath = CONFIG_PATHS[i];
      const config = this.loadJsonFile(configPath) as Config;

      if (config) {
        this.confPath = configPath;
        this.conf = this.buildConfigWithDefaults(config);
        return;
      }

    }

    // no valid config files found
    throw Error(`Config file not provided. Config file should exists in one of these paths: ${JSON.stringify(CONFIG_PATHS)}`);
  }

  private loadJsonFile<T>(path: string): T | null {
    try {
      if (!existsSync(path)) {
        return null;
      }
      const raw = readFileSync(path).toString();
      const data = JSON.parse(raw);
      return data as T || null;
    } catch (err) {
      return null;
    }
  }

  private validateMqttConfig(): void {
    if (!this.conf?.mqtt?.host) {
      throw Error(`MQTT host not set in '${this.confPath}`);
    }
    if (!this.conf?.pending_time) {
      throw Error(`Pending time not set in '${this.confPath}`);
    }
    if (!this.conf?.ui?.code) {
      throw Error(`Verification 'code' not set in '${this.confPath}`);
    }
  }

  private buildConfigWithDefaults(config: Config): Config {
    return {
      ...DEFAULT_CONFIG,
      ...config,
      mqtt: {
        ...DEFAULT_CONFIG.mqtt,
        ...(config.mqtt || {})
      },
      ui: {
        ...DEFAULT_CONFIG.ui,
        ...(config.ui || {})
      }
    }
  }

  private listenToCommandsFromRenderer(): void {
    ipcMain.on(CHANNEL_GET_CONFIG, (event) => {
      log.debug('Sending UI config to renderer', this.conf.ui);
      event.returnValue = JSON.stringify(this.conf.ui);
    });
  }

}

const singleton = new ConfigService();

export { singleton as ConfigService };