<script>
  import { counters } from '../stores/counters.js'
  import { saved } from '../stores/saved.js'
  import { modal } from '../stores/modal.js'
  import { settings } from '../stores/settings.js'
  import { fade } from 'svelte/transition'
  import { v4 as uuid } from 'uuid'
  import { storage } from '../utilities/storage.js'
  import { stringToSec } from '../utilities/timer.js'
  let value = ''
  let name = ''
  $: filled = value.length
  $: valueToSec = stringToSec(value, $settings.dateFormat)

  function clearForm() {
    value = ''
    name = ''
  }

  function addNewCounter() {
    if (valueToSec.error) return

    $counters = [
      {
        name: name,
        id: uuid(),
        secs: valueToSec.secs,
        status: 'pending',
        timeOnChange: Math.floor(Date.now() / 1000),
        secsLeftOnChange: valueToSec.secs,
      },
      ...$counters,
    ]

    storage.set('counters', $counters)
    clearForm()
    $modal.addPanel = false
  }

  function save() {
    if (valueToSec.error) return

    $saved = [
      ...$saved,
      {
        name: name,
        id: uuid(),
        secs: valueToSec.secs,
      },
    ]

    clearForm()
  }
</script>

<div class="container">
  <form class="form" on:submit|preventDefault={addNewCounter}>
    <input
      placeholder="1d 2h 3m 4s"
      class:incorrect={value.trim() && valueToSec.error}
      class="time"
      type="text"
      bind:value
    />
    <input class="name" type="text" bind:value={name} placeholder="name" />
    <div class="form_box">
      {#if valueToSec.error && filled}
        <div class="error">{valueToSec.errorMessage}</div>
      {:else}
        <button
          in:fade|local={{ duration: 200 }}
          disabled={valueToSec.error}
          class:active={!valueToSec.error}
          on:click|preventDefault={save}
          class="save">save</button
        >
        <button
          in:fade|local={{ duration: 200 }}
          disabled={valueToSec.error}
          class:active={!valueToSec.error}
          class="add">add</button
        >
      {/if}
    </div>
  </form>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
  }

  .form {
    width: 300px;
    max-width: 80%;
    display: flex;
    flex-direction: column;
  }

  .form * {
    border: none;
  }

  .name,
  .add,
  .time,
  .error,
  .save {
    padding: 8px;
    border: none;
    margin: 5px;
    text-align: center;
    transition: 0.2s;
  }

  .name:focus,
  .add:focus,
  .time:focus {
    outline: none;
  }
  
  .time {
    background-color: var(--bg-primary-4);
    color: var(--bg-primary-4-text-1);
    font-weight: bold;
  }

  .time:hover,
  .time:focus {
    background-color: var(--bg-primary-6);
    color: var(--bg-primary-6-text-1);
  }

  .time.incorrect {
    background-color: var(--bg-danger-1);
    color: var(--bg-danger-1-text-1);
  }

  .name {
    opacity: 0.7;
    background-color: var(--bg-primary-5);
    color: var(--bg-primary-5-text-1);
  }

  .name:hover,
  .name:focus {
    opacity: 1;
  }

  .form_box {
    display: flex;
    justify-content: space-between;
    align-content: stretch;
  }

  .error {
    width: 100%;
    color: var(--bg-primary-1-text-3);
  }

  .add,
  .save {
    background-color: var(--bg-primary-3);
    width: calc(50% - 5px);
    color: var(--bg-primary-3-text-2);
    opacity: 0.3;
    cursor: default;
  }

  .add {
    color: var(--bg-primary-3-text-1);
  }

  .save.active,
  .add.active {
    cursor: pointer;
    opacity: 1;
  }

  .save.active:hover,
  .save.active:focus,
  .add.active:hover,
  .add.active:focus {
    background-color: var(--bg-primary-2);
  }

</style>
