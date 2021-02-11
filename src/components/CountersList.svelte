<script>
  import { counters } from '../stores/counters.js'
  import { flip } from 'svelte/animate'
  import Counter from './Counter.svelte'
</script>

<h2 class="heading">counters</h2>
<ul class="list">
  {#each $counters as { timeOnActivate, secsLeftOnActivate, id, secsLeft, active, ...rest } (id)}
    <li class="list_item" animate:flip={{ duration: 200 }}>
      <Counter
        {id}
        {...rest}
        bind:secsLeft
        bind:active
        bind:secsLeftOnActivate
        bind:timeOnActivate
      />
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
