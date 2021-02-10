<script>
  import { saved } from '../stores/saved.js'
  import Saved from './Saved.svelte'
  import {flip} from 'svelte/animate'
  export let inModal = false
</script>

<h2>saved</h2>

<ul class="list">
  {#each $saved as { name, secs, id } (id)}
    <li class="list_item" animate:flip={{duration:200}}>
      <Saved {name} {secs} {id} {inModal} />
    </li>
  {/each}
</ul>

<style>
  .list {
    margin: 10px 0;
    width: 100%;
    max-width: 225px;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    flex-direction: column;
  }

  .list_item {
    text-align: left;
    margin-bottom: 10px;
    padding: 0;
    position: relative;
  }

</style>
