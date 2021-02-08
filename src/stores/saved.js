import { writable } from 'svelte/store'
import { storage } from '../utilities/storage.js'

export const saved = writable(storage.get('saved',[]))

// {
//   name: 'lorem',
//   secs: 552,
//   uuid: 1
// }