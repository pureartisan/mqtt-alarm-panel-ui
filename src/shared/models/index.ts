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
  general_volume: number
  general_volume_max: number
  triggered_message: string
  video_stream?: {
    url: string
    username?: string
    password?: string
  }
}