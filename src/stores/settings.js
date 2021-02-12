import { writable } from 'svelte/store'
import {storage} from '../utilities/storage.js'

export const defaultSettings = {
  theme: 'dark',
  font: 'russo',
  fontSize: 'medium',
  timeVariant: 1,
}

export const settings = writable(storage.get('settings', defaultSettings))
