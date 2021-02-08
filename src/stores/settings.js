import { writable } from 'svelte/store'

export const settings = writable({
  theme: 'dark',
  font: 'russo',
  themes: ['dark', 'light'],
  fonts: ['russo', 'roboto']
})