import { writable } from 'svelte/store'
import { storage } from '../utilities/storage.js'

export const modal = writable({
  settings: false,
  history: false,
  about: false,
  addPanel: false,
  cookiesInfo: !storage.get('cookiesAccepted', false)
})