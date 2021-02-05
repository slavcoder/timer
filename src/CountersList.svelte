<script>
  import { counters } from './stores/counters.js'
  import Counter from './Counter.svelte'

  function removeCounter(uuid) {
    $counters = $counters.filter(el => el.uuid != uuid)
  }

</script>

{#each $counters as {uuid, secsLeft, ...rest} (uuid)}
  <Counter {uuid} {...rest} {removeCounter} bind:secsLeft />
{/each}