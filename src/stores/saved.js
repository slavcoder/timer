import { writable } from 'svelte/store'

export const saved = writable([
  {
    name: 'short',
    secs: 52,
    uuid: '2452f23ra'
  },
  {
    name: 'long',
    secs: 5252,
    uuid: '245f523ra'
  },
  {
    name: 'very long name',
    secs: 42552,
    uuid: '2d45f23ra'
  }
])

// {
//   name: 'lorem',
//   secs: 552,
//   uuid: 245f23ra
// }