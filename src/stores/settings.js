import { writable } from 'svelte/store'
import { storage } from '../utilities/storage.js'
import { alarmList } from '../data/alarmList.js'

export const defaultSettings = {
  theme: 'mirage',
  font: 'Noto Sans',
  fontSize: 'medium',
  timeVariant: 1,
  alarm: 'enabled',
  alarmVolume: 50,
  alarmSound: 'bleep',
  progressBar: 'enabled',
  clock: 'enabled',
  digitalClock: 'enabled',
  digitalClockType: '24h',
  dateFormat: 'dd/mm/yyyy',
  clockTimeFormat: '24h',
}

export const settings = writable(storage.get('settings', defaultSettings))

export const options = {
  theme: [
    'mirage',
    'dark-grey',
    'light-grey',
    'dark-goblin',
    'dark-purple',
    'cyberpunk-dark',
    'cyberpunk-light',
    'arctic',
    'dead-blue',
    'pink-rose',
  ],
  font: [
    'Russo One',
    'Roboto Condensed',
    'Noto Sans',
    'Mukta',
    'Fjalla One',
    'Teko',
    'Oswald',
    'Hammersmith One',
    'Francois One',
    'Acme',
    'Jockey One',
    'Ramabhadra',
    'Do Hyeon',
  ],
  fontSize: ['small', 'medium', 'large'],
  timeVariant: [1, 2],
  alarm: ['enabled', 'disabled'],
  alarmSound: Object.keys(alarmList),
  progressBar: ['enabled', 'disabled'],
  clock: ['enabled', 'disabled'],
  digitalClock: ['enabled', 'disabled'],
  digitalClockType: ['24h', '12h'],
  dateFormat: [
    'dd/mm/yyyy',
    'dd-mm-yyyy',
    'yyyy/mm/dd',
    'yyyy-mm-dd',
    'mm/dd/yyyy',
    'mm-dd-yyyy',
  ],
  clockTimeFormat: ['24h', '12h'],
}
