<script>
  import { counters } from '../stores/counters.js'
  import { saved } from '../stores/saved.js'
  import { modal } from '../stores/modal.js'
  import { fade } from 'svelte/transition'
  import { v4 as uuid } from 'uuid'
  import { storage } from '../utilities/storage.js'
  import { stringToSec } from '../utilities/timer.js'
  let value = ''
  let name = ''
  $: filled = value.length
  $: valueToSec = stringToSec(value)

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
        secsLeft: valueToSec.secs,
        active: false,
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
          in:fade={{duration:200}}
          disabled={valueToSec.error}
          class:active={!valueToSec.error}
          on:click|preventDefault={save}
          class="save">save</button
        >
        <button
          in:fade={{duration:200}}
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

  .time:hover,
  .time:focus {
    background-color: var(--color-primary-8);
  }

  .name:hover,
  .name:focus {
    background-color: var(--color-primary-5);
    opacity: 1;
  }

  .name {
    opacity: 0.7;
    background-color: var(--color-primary-5);
    color: var(--color-primary-7);
  }

  .form_box {
    display: flex;
    justify-content: space-between;
    align-content: stretch;
  }

  .error {
    width: 100%;
    color: var(--color-danger);
  }

  .add,
  .save {
    background-color: var(--color-primary-2);
    width: calc(50% - 5px);
    color: var(--color-primary-7);
    opacity: 0.3;
  }

  .add {
    color: var(--color-success);
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
    background-color: var(--color-primary-7);
    color: var(--color-primary-3);
  }

  .time {
    background-color: var(--color-primary-7);
    color: var(--color-primary-3);
  }

  .time.incorrect {
    background-color: var(--color-danger);
  }
</style>
