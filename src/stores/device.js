import { writable } from 'svelte/store'

export const device = writable({
  isMobile: Boolean(navigator.userAgent.toLowerCase().match(/mobile/i)),
  innerWidth: window.innerWidth
})