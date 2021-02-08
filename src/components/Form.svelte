<script>
  import { counters } from '../stores/counters.js'
  import { uuid } from '../stores/uuid.js'
  import { saved } from '../stores/saved.js'
  import { modal } from '../stores/modal.js'
  import { storage } from '../utilities/storage.js'
  import { stringToSec } from '../utilities/timer.js'
  let value = ''
  let name = ''
  $: valueToSec = stringToSec(value)
  $: correct = Boolean(valueToSec)

  function addNewCounter() {
    if (!valueToSec) return

    $counters = [
      ...$counters,
      {
        name: name,
        uuid: $uuid++,
        secs: valueToSec,
        secsLeft: valueToSec,
        active: false,
      },
    ]

    storage.set('counters', $counters)
    storage.set('uuid', $uuid)
    value = ''
    name = ''
    $modal.addPanel = false
  }

  function save() {
    if (!valueToSec) return

    $saved = [
      ...$saved,
      {
        name: name,
        uuid: $uuid++,
        secs: valueToSec,
      },
    ]

    storage.set('saved', $saved)
    storage.set('uuid', $uuid)
    value = ''
    name = ''
  }
</script>

<div class="container">
  <form class="form" on:submit|preventDefault={addNewCounter}>
    <input
      placeholder="1d 2h 3m 4s"
      class:incorrect={value.trim() && !valueToSec}
      class="time"
      type="text"
      bind:value
    />
    <input class="name" type="text" bind:value={name} placeholder="name" />
    <div class="form_box">
      <button
        disabled={!correct}
        class:active={valueToSec}
        on:click|preventDefault={save}
        class="save">save</button
      >
      <button disabled={!correct} class:active={valueToSec} class="add"
        >add</button
      >
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
  .save {
    border: none;
    margin: 5px;
    text-align: center;
  }

  .name:focus,
  .add:focus,
  .time:focus {
    outline: none;
  }

  .name {
    background-color: var(--color-primary-2);
    color: var(--color-primary-9);
  }

  .form_box {
    display: flex;
    justify-content: space-between;
    align-content: stretch;
  }

  .add,
  .save {
    background-color: var(--color-primary-2);
    width: calc(50% - 5px);
    color: var(--color-primary-9);
    opacity: 0.5;
  }

  .add {
    color: var(--color-success);
  }

  .save.active,
  .add.active {
    cursor: pointer;
    opacity: 1;
  }

  .time {
    background-color: var(--color-primary-9);
    color: var(--color-primary-3);
  }

  .time.incorrect {
    background-color: var(--color-danger);
  }
</style>
