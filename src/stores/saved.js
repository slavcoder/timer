import { writable } from 'svelte/store'
import { storage } from '../utilities/storage.js'

const pomodoro = [
  {
    name: 'pomodoro',
    secs: 60 * 25,
    id: 'a',
  },
  {
    name: 'short break',
    secs: 60 * 5,
    id: 'b',
  },
  {
    name: 'long break',
    secs: 60 * 15,
    id: 'c',
  },
]

export const saved = writable(storage.get('saved', pomodoro))

// {
//   name: 'lorem',
//   secs: 552,
//   id: 1
// }
