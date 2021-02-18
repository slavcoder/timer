<script>
  import { device } from '../stores/device.js'
  import { history } from '../stores/history.js'
  import { settings } from '../stores/settings.js'
  import { tweened } from 'svelte/motion'
  import { v4 as uuid } from 'uuid'
  import { onDestroy } from 'svelte'
  import { scale, fly, fade } from 'svelte/transition'
  import { counters } from '../stores/counters.js'
  import { secsToObj } from '../utilities/timer.js'
  import Icon from './Icon.svelte'
  import Time from './Time.svelte'
  import TimeAgo from './TimeAgo.svelte'
  import Alarm from './Alarm.svelte'
  export let name
  export let id
  export let secs
  export let status
  export let secsLeftOnChange
  export let timeOnChange
  let playAlarm = false
  let actionsActive = false
  const showActions = () => (actionsActive = true)
  const hideActions = () => (actionsActive = false)
  const nowInSecs = () => Math.floor(Date.now() / 1000)
  const timeObj = secsToObj(secs)
  $: timeLeftObj = secsToObj(counting.secs)

  function remove() {
    $counters = $counters.filter(el => el.id != id)
  }

  function addNewHistoryItem() {
    $history = [
      ...$history,
      {
        id: uuid(),
        name: name,
        secs: secs,
        timeInSecsOnFinish: timeOnChange,
      },
    ]
  }

  function updateStatus(newStatus) {
    status = newStatus
    secsLeftOnChange = counting.secs
    timeOnChange = nowInSecs()
  }

  const counting = {
    secs: secs,
    secsAgo: 0,
    interval: false,
    setProgress: action => {
      if ($settings.progressBar === 'enabled') {
        counting.progressAction[action]()
      }
    },
    progressAction: {
      lastKnown: () => progress.set((secs - counting.secs) / secs),
      start: () => progress.set(1, { duration: counting.secs * 1000 }),
      stop: () => progress.set($progress, { duration: 0 }),
      reset: () => progress.set(0, { duration: 500 }),
    },
    init: {
      pending: () => {
        counting.secs = secs
        counting.setProgress('lastKnown')
      },
      active: () => {
        const diff = nowInSecs() - timeOnChange
        counting.secs = Math.max(secsLeftOnChange - diff, 0)
        counting.setProgress('lastKnown')
        counting.start()
      },
      pauzed: () => {
        counting.secs = secsLeftOnChange
        counting.setProgress('lastKnown')
      },
      finished: () => {
        counting.secs = 0
        counting.setProgress('lastKnown')
        counting.startCountingSecsAgo()
      },
    },
    count: () => {
      counting.secs--
      if (counting.secs <= 0) counting.finish()
    },
    start: () => {
      updateStatus('active')
      counting.interval = setInterval(counting.count, 1000)
      counting.setProgress('start')
    },
    stop: () => {
      clearInterval(counting.interval)
      updateStatus('pauzed')
      counting.setProgress('stop')
    },
    reset: () => {
      playAlarm = false
      clearInterval(counting.interval)
      counting.secs = secs
      updateStatus('pending')
      counting.setProgress('reset')
    },
    toggle: {
      pending: () => counting.start(),
      active: () => counting.stop(),
      pauzed: () => counting.start(),
      finished: () => counting.reset(),
    },
    finish: () => {
      clearInterval(counting.interval)
      counting.secs = 0
      updateStatus('finished')
      if ($settings.alarm === 'enabled') playAlarm = true
      counting.startCountingSecsAgo()
      addNewHistoryItem()
    },
    startCountingSecsAgo: () => {
      counting.countSecsAgo()
      counting.interval = setInterval(counting.countSecsAgo, 1000)
    },
    countSecsAgo: () => {
      counting.secsAgo = nowInSecs() - timeOnChange
    },
    refresh: () => {
      if(status !== 'finished') playAlarm = false
      clearInterval(counting.interval)
      counting.init[status]()
    }
  }

  const progress = tweened(0, { duration: 0 })
  counting.init[status]()
  onDestroy(() => clearInterval(counting.interval))
  
</script>
<svelte:window on:focus={counting.refresh} />

<div
  transition:scale|local={{ duration: 200 }}
  class="counter {status}"
  on:mouseover={showActions}
  on:mouseleave={hideActions}
>
  <button
    class="toggle"
    on:focus={showActions}
    on:blur={hideActions}
    on:click={counting.toggle[status]}
  >
    <span class="time">
      <Time {timeObj} variant={$settings.timeVariant} />
    </span>

    <span class="timeLeft {status}">
      <Time
        name="timeLeft"
        bind:timeObj={timeLeftObj}
        variant={$settings.timeVariant}
      />
      {#if $settings.timeVariant === 1 && status === 'finished'}0{/if}
    </span>

    <span class="name {status}">
      {name}
    </span>

    {#if status === 'finished'}
      <span class="alarmInfo" transition:fade={{ duration: 200 }}>
        <span class="bell"><Icon name="bell" /></span>
        <span class="timeAgo">
          <TimeAgo timeObj={secsToObj(counting.secsAgo)} />
        </span>
      </span>
    {/if}
  </button>

  {#if actionsActive || $device.isMobile}
    <button
      transition:fly={{ x: -50, duration: 200 }}
      class="button delete"
      on:focus={showActions}
      on:blur={hideActions}
      on:click={() => remove()}
    >
      <Icon name="delete" />
    </button>

    {#if status !== 'pending'}
      <button
        transition:fly={{ x: 50, duration: 200 }}
        class="button reset"
        on:focus={showActions}
        on:blur={hideActions}
        on:click={counting.reset}
      >
        <Icon name="reset" />
      </button>
    {/if}
  {/if}

  {#if $settings.progressBar === 'enabled'}
    <div class="progress {status}" style="transform: scaleX({$progress});" />
  {/if}

  {#if playAlarm}
    <Alarm
      bind:play={playAlarm}
      sound={$settings.alarmSound}
      volume={$settings.alarmVolume}
    />
  {/if}
</div>

<style>
  .counter {
    width: 100%;
    background-color: var(--color-primary-7);
    color: var(--color-primary-6);
    position: relative;
    transition: opacity 0.2s;
  }

  .counter.pending {
    opacity: 0.7;
  }

  .toggle {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 10px;
    width: 100%;
    margin: 0;
    background-color: transparent;
    border: none;
  }

  .toggle:hover,
  .toggle:focus {
    background-color: var(--color-primary-11);
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: var(--color-primary-2);
    color: var(--color-primary-7);
    position: absolute;
    width: 50px;
    height: 100%;
    top: 0;
    cursor: pointer;
    padding: 5px 12px;
  }

  .button:hover,
  .button:focus {
    opacity: 0.8;
    color: var(--color-success);
    background-color: var(--color-primary-2);
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
    font-size: 1.4em;
    width: 100%;
    padding: 0.1em 0;
    color: var(--color-primary-10);
  }

  .timeLeft {
    width: 100%;
    font-size: 2.5em;
    display: flex;
    padding: 0.1em 0;
    justify-content: flex-end;
    text-align: right;
    color: var(--color-primary-10);
    transition: 0.2s;
    margin-bottom: 0.4em;
  }

  .time,
  .timeLeft {
    font-weight: bold;
    line-height: 1;
  }

  .timeLeft.active,
  .timeLeft.finished {
    color: var(--color-success-2);
  }

  .timeLeft.pauzed {
    color: var(--color-danger-2);
  }

  .name {
    color: var(--color-primary-6);
    width: 100%;
    word-wrap: anywhere;
    text-align: right;
  }

  .timeLeft.finished,
  .name.finished {
    opacity: 0;
  }

  .progress {
    transform-origin: left center;
    background-color: var(--color-primary-2);
    height: 5px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .progress.pauzed {
    background-color: var(--color-danger-2);
  }

  .progress.active,
  .progress.finished {
    background-color: var(--color-success-2);
  }

  .alarmInfo {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--color-success-3);
    z-index: 50;
  }

  @keyframes ringing {
    0% {
      transform: rotate(20deg);
    }
    50% {
      transform: rotate(-20deg);
    }
    100% {
      transform: rotate(20deg);
    }
  }

  .bell {
    width: 40px;
    display: block;
    color: var(--color-success-2);
    animation: ringing;
    animation-duration: 0.5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  .timeAgo {
    color: var(--color-success-2);
  }
</style>
