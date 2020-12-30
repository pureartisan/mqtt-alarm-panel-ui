import { ipcMain } from 'electron';
import log from 'electron-log';
import { Gpio, BinaryValue } from 'onoff';

import { CHANNEL_BUZZER_TRIGGER } from '@shared/constants';
import { BuzzerSound } from '@shared/models';

import { ConfigService } from '@electron/services/config';
import { IS_PI } from '@electron/utils/device';

class BuzzerService {
  buzzer?: Gpio;
  buzzerSound?: BuzzerSound;

  activeTimeout?: NodeJS.Timeout;

  init(): void {
    process.on('SIGINT', () => this.cleanupGpio());
    this.initGpio();
    this.listenToCommandsFromRenderer();
  }

  private initGpio(): void {
    if (ConfigService.config.buzzer_pin) {
      log.debug('Initialising GPIO pin for Buzzer:', ConfigService.config.buzzer_pin);
      if (IS_PI) {
        this.buzzer = new Gpio(ConfigService.config.buzzer_pin, 'out');
      } else {
        log.debug('[MOCK] Setting buzzer pin OUT:', ConfigService.config.buzzer_pin);
      }
    }
  }

  private cleanupGpio(): void {
    this.buzzer?.unexport();
  }

  private listenToCommandsFromRenderer(): void {
    ipcMain.on(CHANNEL_BUZZER_TRIGGER, (event, sound?: BuzzerSound) => {
      this.triggerBuzzer(sound);
    });
  }

  private triggerBuzzer(buzzerSound?: BuzzerSound): void {
    this.buzzerSound = buzzerSound;
    if (this.buzzerSound) {
      this.startBuzzer();
    } else {
      this.stopBuzzer();
    }
  }

  private startBuzzer(): void {
    if (!this.buzzerSound?.time) {
      return;
    }
    // clear any active timeouts
    if (this.activeTimeout) {
      clearTimeout(this.activeTimeout);
    }

    // enable buzzer
    this.writeToBuzzerPin(1);

    // disable after given time
    this.activeTimeout = setTimeout(() => {

      // disable buzzer
      this.writeToBuzzerPin(0);

      // do we need to loop?
      if (this.buzzerSound?.loop_delay) {
        // wait for a while and start buzzer again
        this.activeTimeout = setTimeout(
          () => this.startBuzzer(),
          this.buzzerSound.loop_delay * 1000
        );
      }
    }, this.buzzerSound.time * 1000);
  }

  private stopBuzzer(): void {
    // clear any active timeouts
    if (this.activeTimeout) {
      clearTimeout(this.activeTimeout);
    }
    // disable buzzer
    this.writeToBuzzerPin(0);
  }

  private writeToBuzzerPin(value: BinaryValue | boolean): void {
    const binaryValue = value ? 1 : 0;
    if (IS_PI) {
      this.buzzer?.writeSync(binaryValue);
      log.debug('Setting buzzer to:', binaryValue);
    } else {
      log.debug('[MOCK] Setting buzzer to:', binaryValue);
    }
  }

}

const singleton = new BuzzerService();

export { singleton as BuzzerService };