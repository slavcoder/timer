<script>
  import { now } from '../stores/time.js'
  export let type = '24h'
  // export let type = '12h'
  const validate = item => (item < 10 ? '0' + item : item)

  let seconds = $now.getSeconds()
  let minutes = $now.getMinutes()
  let hours = $now.getHours()

  $: seconds = $now.getSeconds()
  $: minutes = $now.getMinutes()
  $: hours = $now.getHours()
</script>

<div class="clock">
  <span class="hours">
    {#if type === '24h'}
      {validate(hours)}
    {:else}
      {hours % 12 ? validate(hours % 12) : '12'}
    {/if}
  </span>:
  <span class="minutes">{validate(minutes)}</span> :
  <span class="seconds">{validate(seconds)}</span>
</div>

<style>
  .clock {
    background-color: var(--color-primary-3);
    margin: 1em auto 2em auto;
    min-width: 120px;
    text-align: center;
    font-size: 1.4em;
  }
</style>
