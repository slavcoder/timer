<script>
  import { counters } from '../stores/counters.js'
  import { settings } from '../stores/settings.js'
  import { now } from '../stores/time.js'
  import { saved } from '../stores/saved.js'
  import { modal } from '../stores/modal.js'
  import { v4 as uuid } from 'uuid'
  import { fly, scale } from 'svelte/transition'
  import { secsToObj } from '../utilities/timer.js'
  import Time from './Time.svelte'
  import Icon from './Icon.svelte'
  export let inModal = false
  export let name
  export let secs
  export let id
  let deleteActive = false
  const showDelete = () => (deleteActive = true)
  const hideDelete = () => (deleteActive = false)

  function remove() {
    $saved = $saved.filter(el => el.id != id)
  }

  function addNewCounter(name, secs) {
    $counters = [
      {
        name: name,
        id: uuid(),
        secs: secs,
        status: 'pending',
        timeOnChange: Math.floor($now.getTime() / 1000),
        secsLeftOnChange: secs,
      },
      ...$counters,
    ]

    $modal.addPanel = false
  }
</script>

<div class="saved" transition:scale|local={{ duration: 200 }} class:inModal>
  {#if deleteActive || inModal}
    <button
      class="delete"
      class:inModal
      on:focus={showDelete}
      on:blur={hideDelete}
      on:mouseover={showDelete}
      on:mouseleave={hideDelete}
      transition:fly|local={{ x: -50, duration: 200 }}
      on:click={() => remove()}
    >
      <Icon name="delete" />
    </button>
  {/if}
  <button
    class="add"
    class:inModal
    on:focus={showDelete}
    on:blur={hideDelete}
    on:mouseover={showDelete}
    on:mouseleave={hideDelete}
    on:click={() => addNewCounter(name, secs)}
  >
    <span class="time variant-{$settings.timeVariant}">
      <Time timeObj={secsToObj(secs)} variant={$settings.timeVariant} />
    </span>
    <span class="name">{name}</span>
  </button>
</div>

<style>
  .saved {
    height: 100%;
  }

  .saved.inModal {
    display: flex;
    align-items: stretch;
  }

  .time {
    /* padding: .2em; */
    line-height: 1;
    font-weight: bold;
  }

  .time.variant-1 {
    word-wrap: anywhere;
  }

  .name {
    word-wrap: anywhere;
    text-align: left;
    font-size: 0.6em;
    margin-top: 0.2em;
    /* font-weight: 400; */
    color: var(--color-success);
    opacity: 0.8;
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
    color: var(--color-primary-7);
    border: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    width: 50px;
    height: 100%;
    right: 100%;
    margin: 0;
    padding: 5px 12px;
  }

  .delete.inModal {
    height: auto;
    position: static;
  }

  .add {
    font-size: 1.6em;
    background-color: var(--color-primary);
    border: none;
    cursor: pointer;
    color: var(--color-primary-7);
    max-width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    text-align: left;
    margin: 0;
    height: 100%;
    padding: 0.3em;
  }

  .add.inModal {
    width: 100%;
  }

  .add:hover,
  .add:focus {
    background-color: var(--color-primary-2);
  }
</style>
