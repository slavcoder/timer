import { writable } from 'svelte/store'
import {storage} from '../utilities/storage.js'

export const defaultSettings = {
  theme: 'dark',
  font: 'russo',
  fontSize: 'medium',
  timeVariant: 1,
  alarm: 'enabled',
  alarmSound: 'Store Door Chime',
  progressBar: 'enabled',
}

export const settings = writable(storage.get('settings', defaultSettings))
