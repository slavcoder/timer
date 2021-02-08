import { writable } from 'svelte/store'
import { storage } from '../utilities/storage.js'

export let uuid = writable(storage.get('uuid', 1))