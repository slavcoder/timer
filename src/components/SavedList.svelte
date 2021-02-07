<script>
  import { saved } from '../stores/saved.js'
  import { counters } from '../stores/counters.js'
  import { uuid } from '../stores/uuid.js'
  import TimeString from './TimeString.svelte'
  import { secToObj } from '../utilities/timer.js'

  function remove(uuid) {
    $saved = $saved.filter(el => el.uuid != uuid)
  }

  function addNewCounter(name, secs) {
    $counters = [
      ...$counters,
      {
        name: name,
        uuid: $uuid++,
        secs: secs,
        secsLeft: secs,
      },
    ]
  }
</script>

<h2>saved</h2>
<ul class="list">
  {#each $saved as { name, secs, uuid } (uuid)}
    <li class="list_item">
      <button class="button" on:click={() => addNewCounter(name, secs)}>
        <span class="time"><TimeString type="timeSaved" timeObj={secToObj(secs)} /></span>
        <span class="name">{name}</span>
      </button>
    </li>
  {/each}
</ul>


<style>
  .list {
    margin: 10px 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    flex-direction: column;
  }
  
  .list_item {
    text-align: left;
    margin-bottom: 10px;
    padding: 0;
  }
  
  .name {
    text-align: left;
    font-size: .8em;
    color: var(--color-primary-10);
    opacity: .5;
  }

  .time {
    font-size: 1.2em;
  }

  .button {
    background-color: var(--color-primary);
    border: none;
    cursor: pointer;
    color: var(--color-primary-9);
    max-width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    text-align: left;
    margin: 0;
  }
  
  .button:hover, .button:focus {
    background-color: var(--color-primary-2);
  }
</style>