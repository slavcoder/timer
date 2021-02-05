<script>
  import { saved } from './stores/saved.js'
  import { counters } from './stores/counters.js'
  import { uuid } from './stores/uuid.js'
  import TimeString from './TimeString.svelte'
  import { secToObj } from './utilities/timer.js'
  // import { stringToSec } from './timer.js'

  function remove(uuid) {
    $saved = $saved.filter(el => el.uuid != uuid)
  }

  function addNewCounter(name,secs) {
      $counters = [
        ...$counters,
        {
          name: name,
          uuid: $uuid++,
          time: secs,
          timeLeft: secs,
        },
      ]
  }

</script>

<ul>
  {#each $saved as {name,secs,uuid} (uuid)}
    <li>
      <button on:click={() => addNewCounter(name,secs)}>
        <TimeString type="time" timeObj="{secToObj(secs)}" />
        <span>{name}</span>
      </button>
    </li>
  {/each}
</ul>
