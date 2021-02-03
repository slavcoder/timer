<script>
  import { counters } from './stores/counters.js'
  import { uuid } from './stores/uuid.js'
  import { stringToSec } from './timer.js'
  let value = ''
  let name = ''
  let type = 'counter'
  // let uuid = 1
  $: valueToSec = stringToSec(value)

  function addNewCounter() {
    if (valueToSec) {
      $counters = [
        ...$counters,
        {
          name: name,
          uuid: $uuid++,
          time: valueToSec,
          timeLeft: valueToSec,
        },
      ]

      value = ''
      name = ''
    }
  }

</script>

<form on:submit|preventDefault={addNewCounter}>
  <input type="text" bind:value={name}>
  <input
    class:incorrect={value.trim() && !valueToSec}
    class="input"
    type="text"
    bind:value
  />
  <select class="select" bind:value={type}>
    <option value="counter">counter</option>
    <option value="quick start">quick start</option>
  </select>
  <button class:active={valueToSec} class="btn">add</button>
</form>

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
