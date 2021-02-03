<script>
  import { counters } from './stores/counters.js'
  import Counter from './Counter.svelte'

  function removeCounter(uuid) {
    $counters = $counters.filter(el => el.uuid != uuid)
  }

</script>

{#each $counters as {uuid, timeLeft, ...rest} (uuid)}
  <Counter {uuid} {...rest} {removeCounter} bind:timeLeft />
{/each}