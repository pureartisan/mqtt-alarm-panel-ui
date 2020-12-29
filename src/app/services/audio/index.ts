import UiFx from 'uifx';
import log from 'electron-log';
import { ipcRenderer } from 'electron';

import { BuzzerSound } from '@shared/models';

import { ConfigService } from '@app/services/config';
import { CHANNEL_BUZZER_TRIGGER } from '@shared/constants';

import errorAudio from '@app/assets/audio/error.mp3';
import clickAudio from '@app/assets/audio/click.mp3';
import beepAudio from '@app/assets/audio/beep.mp3';
import sirenAudio from '@app/assets/audio/siren.mp3';

export type SoundEffect = 'error' | 'click' | 'beep';
export type Sound = 'siren';

class AudioService {

  private errorFx?: UiFx;
  private clickFx?: UiFx;
  private beepFx?: UiFx;

  init(): void {
    this.loadAudioFiles();
  }

  play(sound: SoundEffect, volume?: number): void {
    if (ConfigService.config.use_buzzer) {
      this.playBuzzer(sound);
    } else {
      this.playAudio(sound, volume);
    }
  }

  loop(sound: Sound, volume?: number): HTMLAudioElement | undefined {
    if (ConfigService.config.use_buzzer) {
      this.playBuzzer(sound);
    } else {
      return this.loopAudio(sound, volume);
    }
  }

  playAudio(sound: SoundEffect, volume?: number): void {
    try {
      if (volume === undefined) {
        volume = ConfigService.config.general_volume * ConfigService.config.general_volume_max;
      }
      // NOTE: Check volume because of bug: https://github.com/wle8300/uifx/issues/24
      if (volume) {
        this.getUiFx(sound)?.play(volume);
      }
    } catch (err) {
      log.error(err);
    }
  }

  private loopAudio(sound: Sound, volume?: number): HTMLAudioElement | undefined {
    try {
      const audio = this.getAudio(sound);
      if (audio) {
        audio.addEventListener('ended', () => {
          audio.currentTime = 0;
          audio.play();
        }, false);
        audio.volume = volume || 0.5;
        audio.play();
      }
      return audio;
    } catch (err) {
      log.error(err);
    }
  }

  private playBuzzer(sound: SoundEffect | Sound): void {
    const buzzerSound = this.getBuzzerSound(sound);
    if (buzzerSound) {

    }
  }

  private loadAudioFiles(): void {

    // no need to load files if buzzer is being used
    if (ConfigService.config.use_buzzer) {
      return;
    }

    this.errorFx = new UiFx(
      errorAudio,
      {
        throttleMs: 100
      }
    );

    this.clickFx = new UiFx(
      clickAudio,
      {
        throttleMs: 100
      }
    );

    this.beepFx = new UiFx(
      beepAudio,
      {
        throttleMs: 100
      }
    );
  }

  private getUiFx(sound: SoundEffect): UiFx | undefined {
    switch (sound) {
      case 'error':
        return this.errorFx;
      case 'click':
        return this.clickFx;
      case 'beep':
        return this.beepFx;
      default:
        return undefined;
    }
  }

  private getAudio(sound: Sound): HTMLAudioElement | undefined {
    switch (sound) {
      case 'siren':
        const audio = new Audio();
        audio.src = sirenAudio;
        return audio;
      default:
        return undefined;
    }
  }

  private getBuzzerSound(sound: Sound | SoundEffect): BuzzerSound | undefined {
    switch (sound) {
      case 'siren':
        return {
          time: 2,
          loop_delay: 1
        };
      case 'error':
        return {
          time: 1
        };
      case 'click':
        return {
          time: 0.1
        };
      case 'beep':
        return {
          time: 1.2
        };
      default:
        return undefined;
    }
  }

  private sendBuzzerSound(buzzerSound: BuzzerSound): void {
    log.debug('Sending buzzer sound to main thread:', buzzerSound);
    ipcRenderer.send(CHANNEL_BUZZER_TRIGGER, buzzerSound);
  }

}

const singleton = new AudioService();

export { singleton as AudioService };