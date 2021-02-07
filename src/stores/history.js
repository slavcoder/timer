import { writable } from 'svelte/store'

export const history = writable({
  open: false,
})