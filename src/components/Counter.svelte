<script>
  import { device } from '../stores/device.js'
  import { onDestroy } from 'svelte'
  import { scale, fly } from 'svelte/transition'
  import { counters } from '../stores/counters.js'
  import { storage } from '../utilities/storage.js'
  import { secToObj } from '../utilities/timer.js'
  import Icon from './Icon.svelte'
  import TimeString from './TimeString.svelte'
  export let name
  export let uuid
  export let secs
  export let secsLeft
  export let active
  export let secsLeftOnActivate = 0
  export let timeOnActivate = 0
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
    finished: false,
    interval: false,
    count: () => {
      secsLeft--
      if (secsLeft <= 0) counting.finish()
    },
    start: () => {
      active = true
      const now = new Date()
      secsLeftOnActivate = secsLeft
      timeOnActivate = Math.floor(now.getTime() / 1000)
      counting.interval = setInterval(counting.count, 1000)
      storage.set('counters', $counters)
    },
    stop: () => {
      clearInterval(counting.interval)
      active = false
      storage.set('counters', $counters)
    },
    reset: () => {
      counting.stop()
      secsLeft = secs
      counting.finished = false
      storage.set('counters', $counters)
    },
    toggle: () => {
      if (active) {
        counting.stop()
      } else if (!counting.finished) {
        counting.start()
      }
    },
    finish: () => {
      counting.finished = true
      counting.stop()
    },
  }

  if (active) {
    const now = new Date()
    const nowInSecs = Math.floor(now.getTime() / 1000)
    const secsDiff = nowInSecs - timeOnActivate
    secsLeft = Math.max(secsLeftOnActivate - secsDiff, 0)
    if (!secsLeft) {
      counting.finish()
    } else {
      counting.start()
    }
  }

  if (!secsLeft) counting.finish()
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
      <span class="timeLeft" class:active class:pauzed={!active && secsLeft < secs}>
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

    {#if secs > secsLeft || active}
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
    background-color: var(--color-primary-9);
    color: var(--color-primary-7);
    position: relative;
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
    opacity: 0.8;
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
    opacity: .7;
    color: var(--color-primary-14);
    transition: 0.2s;
  }

  .timeLeft.active {
    opacity: 1;
    color: var(--color-primary-5);
  }

  .timeLeft.pauzed {
    opacity: 1;
    color: var(--color-danger-2);
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
