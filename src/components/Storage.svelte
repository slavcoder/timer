<script>
  import { storage } from '../utilities/storage.js'
  import {settings} from '../stores/settings.js'
  import {saved} from '../stores/saved.js'
  import {history} from '../stores/history.js'

  $: storage.set('settings', $settings) 
  $: storage.set('saved', $saved) 
  $: storage.set('history', $history)
</script>