<script>
  // import { device } from '../stores/device.js'
  // import { fly } from 'svelte/transition'
  import { saved } from '../stores/saved.js'
  // import { counters } from '../stores/counters.js'
  // import { uuid } from '../stores/uuid.js'
  import Saved from './Saved.svelte'
  import {flip} from 'svelte/animate'
  // import TimeString from './TimeString.svelte'
  // import Icon from './Icon.svelte'
  // import { secToObj } from '../utilities/timer.js'
  export let modal = false
  // let deleteActive = false
  
</script>

<h2>saved</h2>

<ul class="list" class:modal>
  {#each $saved as { name, secs, uuid } (uuid)}
    <li class="list_item"  animate:flip={{duration:200}} class:modal>
      <Saved {modal} {name} {secs} savedUuid={uuid} />
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

  /* .list.modal {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
  } */

  /* .list_item.modal {
    width: 100%;
    margin: 5px 15px 5px 50px;
  } */

  .list_item {
    text-align: left;
    margin-bottom: 10px;
    padding: 0;
    position: relative;
  }

</style>
