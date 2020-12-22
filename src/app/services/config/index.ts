import { ipcRenderer } from 'electron';
import log from 'electron-log';

import { CHANNEL_GET_CONFIG, CHANNEL_UPDATE_UI_CONFIG } from '@shared/constants';
import { UiConfig } from '@shared/models';

class ConfigService {
  private conf: UiConfig = {
    stand_by_screen_delay: 90,
    siren_volume: 0.7,
    general_volume: 0.3,
    general_volume_max: 1,
    code: ''
  };

  get config(): UiConfig {
    return this.conf;
  }

  init(): void {
    this.getConfigFromMainThread();
  }

  saveConfig<N extends keyof UiConfig>(name: N, value: UiConfig[N]): void {
    this.conf[name] = value;
    this.updateConfig(name, value);
  }

  private updateConfig<N extends keyof UiConfig>(name: N, value: UiConfig[N]): void {
    log.debug('Sending config update to main thread', name);
    // NOTE: use `send` instead of `sendSync` as we are not expecting a response
    ipcRenderer.send(CHANNEL_UPDATE_UI_CONFIG, name, value);
  }

  private getConfigFromMainThread(): void {
    log.debug('Getting UI config from main thread');
    const config = ipcRenderer.sendSync(CHANNEL_GET_CONFIG);
    try {
      this.conf = {
        ...this.conf,
        ...JSON.parse(config) as UiConfig
      };
    } catch (err) {
      log.error('Invalid config sent by main thread', config);
    }
  }

}

const singleton = new ConfigService();

export { singleton as ConfigService };