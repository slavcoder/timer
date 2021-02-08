<script>
  import { device } from '../stores/device.js'
  import { fly } from 'svelte/transition'
  import { saved } from '../stores/saved.js'
  import { counters } from '../stores/counters.js'
  import { uuid } from '../stores/uuid.js'
  import TimeString from './TimeString.svelte'
  import Icon from './Icon.svelte'
  import { secToObj } from '../utilities/timer.js'
  export let modal = false
  let deleteActive = false

  function showDelete() {
    deleteActive = true
  }
  function hideDelete() {
    deleteActive = false
  }

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
<ul class="list" class:modal>
  {#each $saved as { name, secs, uuid } (uuid)}
    <li class="list_item" class:modal>
      {#if deleteActive || $device.isMobile}
        <button
          on:focus={showDelete}
          on:blur={hideDelete}
          on:mouseover={showDelete}
          on:mouseleave={hideDelete}
          transition:fly={{ x: -50, duration: 200 }}
          class="delete"
          on:click={() => remove(uuid)}
        >
          <Icon name="delete" />
        </button>
      {/if}
      <button
        on:focus={showDelete}
        on:blur={hideDelete}
        on:mouseover={showDelete}
        on:mouseleave={hideDelete}
        class="button"
        on:click={() => addNewCounter(name, secs)}
      >
        <span class="time"
          ><TimeString type="timeSaved" timeObj={secToObj(secs)} /></span
        >
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

  .list.modal {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .list_item.modal {
    margin: 15px;
  }

  .list_item {
    text-align: left;
    margin-bottom: 10px;
    padding: 0;
    position: relative;
  }

  .name {
    text-align: left;
    font-size: 0.8em;
    color: var(--color-primary-10);
    opacity: 0.5;
  }

  .delete:hover,
  .delete:focus {
    color: var(--color-danger);
  }

  .delete {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-primary-2);
    color: var(--color-primary-9);
    border: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    width: 50px;
    height: 100%;
    right: 100%;
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

  .button:hover,
  .button:focus {
    background-color: var(--color-primary-2);
  }
</style>
