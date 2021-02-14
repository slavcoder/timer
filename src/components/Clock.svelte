<script>
  import { onMount } from 'svelte'
  import { now } from '../stores/time.js'
  const rotateHourMarks = [0, 30, 60, 90, 120, 150]
  const dayInSecs = 24 * 3600
  const hourInSecs = 3600
  const minuteInSecs = 60
  const maxHandDeg = 720
  let currentSecs
  let currentHourInSecs
  let todayInSecs
  updateClock()

  function updateClock() {
    currentSecs = $now.getSeconds()
    currentHourInSecs = $now.getMinutes() * 60 + currentSecs
    todayInSecs = $now.getHours() * 3600 + currentHourInSecs + currentSecs
  }

  $: secsHandDeg = (currentSecs / minuteInSecs) * (maxHandDeg / 2)
  $: minutesHandDeg = (currentHourInSecs / hourInSecs) * (maxHandDeg / 2)
  $: hoursHandDeg = (todayInSecs / dayInSecs) * maxHandDeg

  onMount(() => {
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  })
</script>

<div class="clock">
  {#each rotateHourMarks as deg}
    <div class="line line-{deg}" style="transform: rotate({deg}deg)" />
  {/each}
  <div class="circle" />
  <div class="circle-outside" />
  <div class="hand seconds" style="transform: rotate({secsHandDeg}deg)" />
  <div class="hand minutes" style="transform: rotate({minutesHandDeg}deg)" />
  <div class="hand hours" style="transform: rotate({hoursHandDeg}deg)" />
</div>

<style>
  .clock {
    margin-top: 40px;
    width: 300px;
    height: 300px;
    background-color: var(--color-primary-4);
    border-radius: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 1400px) {
    .clock {
      width: 200px;
      height: 200px;
    }
  }

  .line {
    position: absolute;
    width: calc(100% + 4px);
    height: 2px;
    left: -2px;
    top: calc(50% - 1px);
    background-color: var(--color-primary-5);
  }

  .line-0,
  .line-90 {
    left: -10px;
    width: calc(100% + 20px);
    background-color: var(--color-success);
  }

  .circle {
    position: relative;
    width: 95%;
    height: 95%;
    background-color: var(--color-primary-4);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .circle-outside {
    position: absolute;
    top: -14px;
    left: -14px;
    width: calc(100% + 28px);
    height: calc(100% + 28px);
    background-color: transparent;
    border-radius: 50%;
    border: 1px solid var(--color-primary-5);
  }

  .hand {
    position: absolute;
    bottom: 50%;
    transform-origin: center bottom;
    border-radius: 5px;
  }

  .hand.hours {
    left: calc(50% - 2px);
    height: 25%;
    width: 4px;
    background-color: var(--color-primary-6);
  }

  .hand.minutes {
    left: calc(50% - 2px);
    height: 35%;
    width: 4px;
    background-color: var(--color-primary-5);
  }

  .hand.seconds {
    left: calc(50% - 1px);
    height: 40%;
    width: 2px;
    background-color: var(--color-primary);
  }
</style>
