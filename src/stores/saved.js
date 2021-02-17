import { writable } from 'svelte/store'
import { storage } from '../utilities/storage.js'
import { v4 as uuid } from 'uuid'

const pomodoro = [
  {
    name: 'pomodoro',
    secs: 60 * 25,
    id: uuid()
  },
  {
    name: 'short break',
    secs: 60 * 5,
    id: uuid()
  },
  {
    name: 'long break',
    secs: 60 * 15,
    id: uuid()
  },
]

export const saved = writable(storage.get('saved', pomodoro))