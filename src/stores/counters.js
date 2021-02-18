import { writable } from 'svelte/store'
import { storage } from '../utilities/storage.js'

export const counters = writable(storage.get('counters',[]))

// example:
// {
//   name: name,
//   id: uuid(),
//   secs: 1300,
//   status: 'pending',
//   timeOnChange: Math.floor(Date.now() / 1000),
//   secsLeftOnChange: 1200,
// }