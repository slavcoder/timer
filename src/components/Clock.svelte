<script>
  import { now } from '../stores/time.js'
  const rotateHourMarks = [0, 30, 60, 90, 120, 150]
  const dayInSecs = 24 * 3600
  const hourInSecs = 3600
  const minuteInSecs = 60
  const maxHandDeg = 720

  let currentSecs = $now.getSeconds()
  let currentHourInSecs = $now.getMinutes() * 60 + currentSecs
  let todayInSecs = $now.getHours() * 3600 + currentHourInSecs + currentSecs

  $: currentSecs = $now.getSeconds()
  $: currentHourInSecs = $now.getMinutes() * 60 + currentSecs
  $: todayInSecs = $now.getHours() * 3600 + currentHourInSecs + currentSecs

  $: secsHandDeg = (currentSecs / minuteInSecs) * (maxHandDeg / 2)
  $: minutesHandDeg = (currentHourInSecs / hourInSecs) * (maxHandDeg / 2)
  $: hoursHandDeg = (todayInSecs / dayInSecs) * maxHandDeg
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
    margin: 2em auto;
    width: 120px;
    height: 120px;
    background-color: var(--bg-primary-1);
    border-radius: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 1200px) {
    .clock {
      width: 170px;
      height: 170px;
    }
  }

  @media (min-width: 1400px) {
    .clock {
      width: 250px;
      height: 250px;
    }
  }

  @media (min-width: 2400px) {
    .clock {
      width: 400px;
      height: 400px;
    }
  }

  .line {
    position: absolute;
    width: calc(100% + 4px);
    height: 2px;
    left: -2px;
    top: calc(50% - 1px);
    background-color: var(--bg-primary-1-decoration-2);
  }

  .line-0,
  .line-90 {
    left: -10px;
    width: calc(100% + 20px);
    background-color: var(--bg-primary-1-decoration-3);
  }

  .circle {
    position: relative;
    width: 95%;
    height: 95%;
    background-color: var(--bg-primary-1);
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
    border: 1px solid var(--bg-primary-1-border-1);
  }

  .hand {
    position: absolute;
    bottom: 50%;
    z-index: 20;
    transform-origin: center bottom;
    border-radius: 5px;
  }

  .hand.hours {
    left: calc(50% - 2px);
    height: 25%;
    width: 4px;
    background-color: var(--bg-primary-1-decoration-1);
    opacity: .8;
  }

  .hand.minutes {
    left: calc(50% - 2px);
    height: 35%;
    width: 4px;
    background-color: var(--bg-primary-1-decoration-1);
    z-index: 21;
    opacity: .3;
  }

  .hand.seconds {
    z-index: 22;
    left: calc(50% - 1px);
    height: 40%;
    width: 2px;
    background-color: var(--bg-primary-1-decoration-1);
    opacity: .2;
  }
</style>
