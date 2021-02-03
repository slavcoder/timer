<script>
  import { secToObj } from './timer.js'
  import { onDestroy } from 'svelte'
  import TimeString from './TimeString.svelte'
  export let name
  export let uuid
  export let time
  export let timeLeft
  export let removeCounter


  let timeObj = secToObj(time)
  $: timeLeftObj = secToObj(timeLeft)

  const counting = {
    active: false,
    finished: false,
    interval: false,
    count: () => {
      timeLeft--
      console.log('still counting...')
      if (!timeLeft) {
        clearInterval(counting.interval)
        counting.finished = true
        counting.active = false
      }
    },
    start: () => {
      counting.active = true
      counting.interval = setInterval(counting.count, 1000)
    },
    stop: () => {
      clearInterval(counting.interval)
      counting.active = false
    },
    reset: () => {
      counting.stop()
      timeLeft = time
      counting.finished = false
    },
  }

  onDestroy(() => counting.stop())
</script>

<div class="counter">
  <h2>{name}</h2>
  <button on:click={() => removeCounter(uuid)}>delete</button>
  <h3>time:</h3>
  <TimeString type="time" {timeObj} />

  <h3>time left:</h3>
  {#if counting.finished}
    <p>finished!</p>
  {:else}
    <TimeString type="timeLeft" bind:timeObj={timeLeftObj} />
  {/if}

  {#if !counting.active && !counting.finished}
    <button on:click={counting.start}>start</button>
  {:else if !counting.finished}
    <button on:click={counting.stop}>stop</button>
  {/if}

  {#if counting.finished || time > timeLeft}
    <button on:click={counting.reset}>reset</button>
  {/if}
</div>

<style>
  .counter {
    width: 300px;
    border: 1px solid grey;
    padding: 10px;
    background-color: lightyellow;
  }
</style>
