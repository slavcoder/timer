import { writable } from 'svelte/store'
import { storage } from '../utilities/storage.js'

export const defaultSettings = {
  theme: 'dark',
  font: 'Noto Sans',
  fontSize: 'medium',
  timeVariant: 1,
  alarm: 'enabled',
  alarmVolume: 50,
  alarmSound: 'bleep',
  progressBar: 'enabled',
  clock: 'enabled',
  digitalClock: 'disabled',
  digitalType: '24h',
  dateFormat: 'dd/mm/yyyy',
}

export const settings = writable(storage.get('settings', defaultSettings))
