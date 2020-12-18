import { readFileSync, existsSync } from 'fs';
import { homedir } from 'os';
import { resolve as pathResolve } from 'path';

const CONFIG_PATHS = [
  pathResolve('./config.json'),
  pathResolve(homedir(), '.mqtt-alarm-panel-ui/config.json'),
  pathResolve('/etc/mqtt-alarm-panel-ui/config.json')
];

interface Config {
  mqtt: {
    host?: string;
    port: string;
    username?: string;
    password?: string;
    state_topic: string;
    command_topic: string;
  }
  pending_time?: number
  delay_time?: number
}

const DEFAULT_CONFIG: Partial<Config> = {
  mqtt: {
    port: '1883',
    state_topic: 'home/alarm',
    command_topic: 'home/alarm/set'
  },
  pending_time: 120,
  delay_time: 60
};

class ConfigService {
  private conf: Config = {
    ...DEFAULT_CONFIG
  } as Config;
  private confPath: string | null = null;

  init(): void {
    this.loadConfig();
    this.validateMqttConfig();
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
        this.conf = {
          ...DEFAULT_CONFIG,
          ...config,
          mqtt: {
            ...DEFAULT_CONFIG.mqtt,
            ...(config.mqtt || {})
          }
        };
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
    if (!this.config?.mqtt?.host) {
      throw Error(`MQTT host not set in '${this.confPath}`);
    }
    if (!this.config?.pending_time) {
      throw Error(`Pending time not set in '${this.confPath}`);
    }
  }

}

const singleton = new ConfigService();

export { singleton as ConfigService };