<script>
  import { onDestroy } from 'svelte'
  import { fade, blur, slide, scale, fly } from 'svelte/transition'
  import { secToObj } from '../utilities/timer.js'
  import TimeString from './TimeString.svelte'
  export let name
  export let uuid
  export let secs
  export let secsLeft
  export let removeCounter
  let actionsActive = false

  function showActions() {
    actionsActive = true
  }

  function hideActions() {
    actionsActive = false
  }

  let timeObj = secToObj(secs)
  $: timeLeftObj = secToObj(secsLeft)
  $: resetActive = counting.finished || secs > secsLeft

  const counting = {
    active: false,
    finished: false,
    interval: false,
    count: () => {
      secsLeft--
      if (!secsLeft) {
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
      secsLeft = secs
      counting.finished = false
    },
  }

  onDestroy(() => counting.stop())
</script>

<div
  transition:scale={{duration:200}}
  class="counter"
  class:finished={counting.finished}
  class:active={counting.active}
  tabindex="0"
  on:mouseover={showActions}
  on:mouseleave={hideActions}
  on:focus={showActions}
  on:blur={hideActions}
>
  <button class="counter_toggle">
    <div class="time">
      <TimeString type="time" {timeObj} />
    </div>


  </button>
  
  {#if counting.finished}
    <div class="finishedInfo">
      <p>finished!</p>
    </div>
  {:else}
    <div class="timeLeft">
      <TimeString type="timeLeft" bind:timeObj={timeLeftObj} />
    </div>
  {/if}





  {#if actionsActive}
    <div transition:fade={{ duration: 200 }} class="actions">
      <button
        class="button delete"
        on:focus={showActions}
        on:blur={hideActions}
        on:click={() => removeCounter(uuid)}>delete</button
      >
      <button
        class="button reset"
        on:focus={showActions}
        on:blur={hideActions}
        disabled={!resetActive}
        on:click={counting.reset}>reset</button
      >

      {#if !counting.active && !counting.finished}
        <button
          class="button start"
          on:focus={showActions}
          on:blur={hideActions}
          on:click={counting.start}>start</button
        >
      {:else}
        <button
          disabled={counting.finished}
          class="button stop"
          on:focus={showActions}
          on:blur={hideActions}
          on:click={counting.stop}>stop</button
        >
      {/if}
    </div>
  {/if}

  <div class="name">
    <p>{name}</p>
  </div>
</div>

<style>
  .counter {
    width: 100%;
    padding: 10px;
    background-color: var(--color-danger);
    color: var(--color-primary-7);
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }
 
  .counter.active {
    background-color: var(--color-primary-9);
  }
  
  .counter.finished {
    background-color: var(--color-success);
  }
  
  .time {
    width: 30%;
    padding: 10px 0;
    color: var(--color-primary-14);
  }
  
  .actions {
    display: flex;
    top: 0;
    left: 0;
    justify-content: space-between;
    padding: 5px 5%;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--color-primary);
    border: 1px solid var(--color-danger);
  }

  .counter.active .actions {
    border-color: var(--color-primary-9);
  }

  .counter.finished .actions {
    border-color: var(--color-success);
  }
  
  .actions .button:disabled {
    cursor: default;
    opacity: 0.5;
  }
  
  .actions .button {
    margin: 0;
    width: 100px;
    border: none;
    background-color: var(--color-primary-9);
    cursor: pointer;
  }

  .actions .delete {
    background-color: var(--color-danger);
  }

  .actions .button:hover,
  .actions .button:focus {
    opacity: 0.5;
  }

  .timeLeft, 
  .finishedInfo {
    width: 70%;
    display: flex;
    padding: 10px 0;
    justify-content: flex-end;
    text-align: right;
    font-size: 1.5em;
  }
  
  .finishedInfo {
    color: var(--color-primary-2);
  }
  
  .finishedInfo p {
    margin: 0;
    padding: 0;
  }

  .timeLeft {
    color: var(--color-primary-5);
  }

  .name {
    width: 100%;
    color: var(--color-primary-12);
  }
  .name p {
    margin: 0;
    text-align: right;
  }
</style>
