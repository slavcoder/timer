<script>
  import {device} from '../stores/device.js'
  import { onDestroy } from 'svelte'
  import { fade, blur, slide, scale, fly } from 'svelte/transition'
  import { secToObj } from '../utilities/timer.js'
  import Icon from './Icon.svelte'
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
    toggle: () => {
      if (counting.active) {
        counting.stop()
      } else if (!counting.finished) {
        counting.start()
      }
    },
  }

  onDestroy(() => counting.stop())
</script>

<div
  transition:scale={{ duration: 200 }}
  class="counter"
  on:mouseover={showActions}
  on:mouseleave={hideActions}
>
  <button
    class="toggle"
    on:focus={showActions}
    on:blur={hideActions}
    on:click={counting.toggle}
  >
    <span class="time">
      <TimeString type="time" {timeObj} />
    </span>

    {#if counting.finished}
      <span class="finishedInfo">
        <p>finished!</p>
      </span>
    {:else}
      <span class="timeLeft" class:active={counting.active}>
        <TimeString type="timeLeft" bind:timeObj={timeLeftObj} />
      </span>
    {/if}

    <span class="name">
      <p>{name}</p>
    </span>
  </button>

  {#if actionsActive || $device.isMobile}
    <button
      transition:fly={{ x: -50, duration: 200 }}
      class="button delete"
      on:focus={showActions}
      on:blur={hideActions}
      on:click={() => removeCounter(uuid)}
    >
      <Icon name="delete" />
    </button>

    {#if secs > secsLeft || counting.active}
      <button
        transition:fly={{ x: 50, duration: 200 }}
        class="button reset"
        on:focus={showActions}
        on:blur={hideActions}
        disabled={!resetActive}
        on:click={counting.reset}
      >
        <Icon name="reset" />
      </button>
    {/if}

  {/if}
</div>

<style>
  .counter {
    width: 100%;
    /* background-color: var(--color-danger); */
    background-color: var(--color-primary-9);
    color: var(--color-primary-7);
    position: relative;
    /* border-left: 10px solid var(--color-danger); */
  }

  .toggle {
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    padding: 5px 10px;
    width: 100%;
    margin: 0;
    background-color: transparent;
    border: 0;
  }

  .toggle:hover,
  .toggle:focus {
    background-color: var(--color-primary-15);
  }

  .button {
    /* z-index: 8; */
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: var(--color-primary-2);
    color: var(--color-primary-9);
    position: absolute;
    width: 50px;
    height: 100%;
    top: 0;
    cursor: pointer;
  }

  .button:hover,
  .button:focus {
    opacity: 0.8;
    color: var(--color-success);
  }

  .button.delete:hover,
  .button.delete:focus {
    color: var(--color-danger);
  }

  .button.delete {
    right: 100%;
  }

  .button.reset {
    left: 100%;
  }


  .time {
    opacity: .8;
    font-size: 1.2em;
    width: 30%;
    padding: 5px 0;
    color: var(--color-primary-14);
  }

  .timeLeft,
  .finishedInfo {
    width: 70%;
    display: flex;
    padding: 5px 0;
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
    color: var(--color-success-2);
  }

  .timeLeft {
    color: var(--color-danger-2);
    transition: color .2s;
  }

  .timeLeft.active {
    color: var(--color-primary-5);
  }

  .name {
    color: var(--color-primary-12);
    width: 100%;
  }

  .name p {
    margin: 0;
    text-align: right;
  }
</style>
