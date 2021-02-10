import { writable } from 'svelte/store'
import {storage} from '../utilities/storage.js'

export const history = writable(storage.get('history',[]))

// let example = {
//   id: 1,
//   name: 'lorem',
//   secs: 13412
//   timeInSecsOnFinish: '',
// }