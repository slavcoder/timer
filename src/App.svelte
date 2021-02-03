<script>
  import { stringToSec } from './timer.js'
  import Counter from './Counter.svelte'
  let counters = []
  let value = ''
  let uuid = 1
  $: valueToSec = stringToSec(value)

  function addNewCounter() {
    if (valueToSec) {
      counters = [
        ...counters,
        {
          uuid: uuid++,
          time: valueToSec,
          timeLeft: valueToSec,
        },
      ]

      value = ''
    }
  }

  function removeCounter(uuid) {
    counters = counters.filter(el => el.uuid != uuid)
  }
</script>

<h1>Timer</h1>

<form on:submit|preventDefault={addNewCounter}>
  <input
    class:incorrect={value.trim() && !valueToSec}
    class="input"
    type="text"
    bind:value
  />
  <button class:active={valueToSec} class="btn">add</button>
</form>

{#each counters as {uuid, timeLeft, ...rest} (uuid)}
  <Counter {uuid} {...rest} {removeCounter} bind:timeLeft />
{/each}

<style>
  .btn {
    background-color: white;
    border: 1px solid grey;
    opacity: 0.2;
  }
  .active {
    cursor: pointer;
    opacity: 1;
  }
  .incorrect {
    background-color: tomato;
  }
</style>
