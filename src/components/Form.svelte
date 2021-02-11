<script>
  import { counters } from '../stores/counters.js'
  import { v4 as uuid } from 'uuid'
  import { saved } from '../stores/saved.js'
  import { modal } from '../stores/modal.js'
  import { storage } from '../utilities/storage.js'
  import { stringToSec } from '../utilities/timer.js'
  let value = ''
  let name = ''
  $: valueToSec = stringToSec(value)
  $: correct = Boolean(valueToSec)

  function clearForm() {
    value = ''
    name = ''
  }

  function addNewCounter() {
    if (!valueToSec) return

    $counters = [
      {
        name: name,
        id: uuid(),
        secs: valueToSec,
        secsLeft: valueToSec,
        active: false,
      },
      ...$counters,
    ]

    storage.set('counters', $counters)
    clearForm()
    $modal.addPanel = false
  }

  function save() {
    if (!valueToSec) return

    $saved = [
      ...$saved,
      {
        name: name,
        id: uuid(),
        secs: valueToSec,
      },
    ]

    clearForm()
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

  .add,
  .save {
    background-color: var(--color-primary-2);
    width: calc(50% - 5px);
    color: var(--color-primary-7);
    opacity: .3;
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
