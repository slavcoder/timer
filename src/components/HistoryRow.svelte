<script>
  import { history } from '../stores/history.js'
  import { settings } from '../stores/settings.js'
  import { secsToObj } from '../utilities/timer.js'
  import { fade } from 'svelte/transition'
  import Time from './Time.svelte'
  import TimeAgo from './TimeAgo.svelte'
  import Icon from './Icon.svelte'
  export let id
  export let name
  export let secs
  export let timeInSecsOnFinish
  export let nowInSecs
  let secsAgo = Math.max(nowInSecs - timeInSecsOnFinish, 0)
  $: secsAgo = Math.max(nowInSecs - timeInSecsOnFinish, 0)
  let dateOnFinish = new Date(timeInSecsOnFinish * 1000)

  function remove() {
    $history = $history.filter(el => el.id != id)
  }
</script>

<tr transition:fade|local>
  <td class="remove">
    <button on:click={remove}><Icon name="delete" /></button>
  </td>
  <td class="name">
    {#if name.length}
      {name}
    {:else}
      <span class="unnamed">unnamed</span>
    {/if}
  </td>
  <td class="time">
    <Time
      name="history"
      timeObj={secsToObj(secs)}
      variant={$settings.timeVariant}
    />
  </td>
  <td title={dateOnFinish.toLocaleString()} class="finished">
    <TimeAgo timeObj={secsToObj(secsAgo)} />
  </td>
</tr>

<style>
  tr:nth-child(even) {
    background-color: var(--color-primary-11);
  }

  tr {
    color: var(--color-primary-7);
  }

  tr:hover {
    background-color: var(--color-primary-3);
    color: var(--color-primary-8);
  }

  tr:hover button {
    color: var(--color-primary-8);
  }

  td {
    border: 1px solid var(--color-primary);
    text-align: center;
    padding: 5px 20px;
    text-align: left;
  }

  @media (max-width: 800px) {
    td {
      padding: 5px 10px;
    }
  }

  .unnamed {
    opacity: 0.3;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    margin: 0;
    transition: 0.2s;
    min-width: 40px;
    color: var(--color-primary-7);
  }

  tr:hover button:hover,
  button:focus {
    color: var(--color-danger);
    cursor: pointer;
  }

  .remove {
    width: 50px;
  }

  .time {
    width: 100px;
  }

  .finished {
    width: 200px;
  }
</style>
