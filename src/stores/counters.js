import { writable } from 'svelte/store'
import { storage } from '../utilities/storage.js'

export const counters = writable(storage.get('counters',[]))

// export const counters = writable([
//   {
//     name: 'learning math',
//     uuid: '124151fds23',
//     secs: 31600,
//     secsLeft: 31600,
//   },
//   {
//     name: 'pomodoro long',
//     uuid: '12415d1fds23',
//     secs: 3600,
//     secsLeft: 3600,
//   },
//   {
//     name: 'some very long unnessery long oh so long name of a counter that i dont know why is that long',
//     uuid: '1215d1fds23',
//     secs: 3900,
//     secsLeft: 3900,
//   }
// ])

// let example = {
//   name: 'learning math',
//   uuid: '1',
//   secs: 13413,
//   secsLeft: 13413,
//   secsLeftOnActivate: 13413,
//   timeOnActivate: 'time in secs'
// }