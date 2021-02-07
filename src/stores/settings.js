import { writable } from 'svelte/store'

export const settings = writable({
  open: false,
  theme: 'dark',
  font: 'russo',
  themes: ['dark', 'light'],
  fonts: ['russo', 'roboto']
})