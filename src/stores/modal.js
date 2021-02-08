import { writable } from 'svelte/store'

export const modal = writable({
  settings: false,
  history: false,
  about: false,
  addPanel: false
})