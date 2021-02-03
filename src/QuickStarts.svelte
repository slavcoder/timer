<script>
  import { quickStarts } from './stores/quickStarts.js'
  import { counters } from './stores/counters.js'
  import { uuid } from './stores/uuid.js'
  import TimeString from './TimeString.svelte'
  import { secToObj } from './timer.js'
  // import { stringToSec } from './timer.js'

  function removeQuickStart(uuid) {
    $quickStarts = $quickStarts.filter(el => el.uuid != uuid)
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
  {#each $quickStarts as {name,secs,uuid} (uuid)}
    <li>
      <button on:click={() => addNewCounter(name,secs)}>
        <TimeString type="time" timeObj="{secToObj(secs)}" />
        <span>{name}</span>
      </button>
    </li>
  {/each}
</ul>