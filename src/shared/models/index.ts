export type Command = 'DISARM' | 'ARM_HOME' | 'ARM_AWAY';

export type AlarmArmedState = 'disarmed' |
 'armed_home' |
 'armed_away' |
 'armed_night' |
 'pending' |
 'triggered';

export interface UiConfig {
  code: string
  stand_by_screen_delay: number
  siren_volume: number
}