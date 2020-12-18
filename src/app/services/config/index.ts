import { ipcRenderer } from 'electron';

import { CHANNEL_GET_CONFIG } from '@shared/constants';
import { UiConfig } from '@shared/models';

class ConfigService {
  private conf: UiConfig = {
    stand_by_screen_delay: 90
  };

  init(): void {
    this.getConfigFromMainThread();
  }

  get config(): UiConfig {
    return this.conf;
  }

  private getConfigFromMainThread(): void {
    console.log('Getting UI config from main thread');
    const config = ipcRenderer.sendSync(CHANNEL_GET_CONFIG);
    try {
      this.conf = JSON.parse(config) as UiConfig;
    } catch (err) {
      console.error('Invalid config sent by main thread', config);
    }
  }

}

const singleton = new ConfigService();

export { singleton as ConfigService };