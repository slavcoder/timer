<script>
  import { counters } from '../stores/counters.js'
  import { flip } from 'svelte/animate'
  import Counter from './Counter.svelte'
  // export let modal = false

  function removeCounter(uuid) {
    $counters = $counters.filter(el => el.uuid != uuid)
  }

  $: countersReversed = [...$counters].reverse()

  // console.log(countersReversed)
</script>

<h2 class="heading">counters</h2>
<ul class="list">
  {#each countersReversed as {uuid, secsLeft, ...rest} (uuid)}
    <li class="list_item" animate:flip={{duration:200}}>
      <Counter {uuid} {...rest} {removeCounter} bind:secsLeft />
    </li>
  {/each}
</ul>

<style>
  .heading {
    text-align: center;
  }

  .list {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 10px 0;
    padding: 0;
    list-style: none;
  }

  .list_item {
    width: calc(100% - 100px);
    max-width: 400px;
    margin-bottom: 10px;
  }

</style>