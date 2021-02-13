import { writable } from 'svelte/store'
import { storage } from '../utilities/storage.js'

export const counters = writable(storage.get('counters',[]))

// let example = {
//   name: 'learning math',
//   id: '1',
//   secs: 13413,
//   secsLeft: 13413,
//   secsLeftOnActivate: 13413,
//   timeInSecsOnActivate: 'time in secs'
// }


// let example {
//   name: name,
//   id: uuid(),
//   secs: valueToSec.secs,
//   status: 'pending',
//   timeOnChange: Math.floor($now.getTime() / 1000),
//   secsLeftOnChange: valueToSec.secs,
// }