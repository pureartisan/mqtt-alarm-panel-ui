import UiFx from 'uifx';
import log from 'electron-log';

import { ConfigService } from '@app/services/config';

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

  loop(sound: Sound, volume?: number): HTMLAudioElement | undefined {
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

  private loadAudioFiles(): void {

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

}

const singleton = new AudioService();

export { singleton as AudioService };