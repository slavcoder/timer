<script>
  import {settings} from '../stores/settings.js'
  import {counters} from '../stores/counters.js'
  import {saved} from '../stores/saved.js'
  import {history} from '../stores/history.js'
  import { storage } from '../utilities/storage.js'

  $: storage.set('settings', $settings) 
  $: storage.set('counters', $counters)
  $: storage.set('saved', $saved) 
  $: storage.set('history', $history)
</script>