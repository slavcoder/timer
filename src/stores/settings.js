import { writable } from 'svelte/store'
import {storage} from '../utilities/storage.js'

const defaultSettings = {
  theme: 'dark',
  font: 'russo',
}

export const settings = writable(storage.get('settings', defaultSettings))
