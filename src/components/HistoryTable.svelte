<script>
  import HistoryRow from './HistoryRow.svelte'
  import { fade } from 'svelte/transition'
  export let items
  export let nowInSecs
</script>

{#if items.length}
  <table class="table">
    <thead>
      <tr>
        <th />
        <th>name</th>
        <th>time</th>
        <th>finished</th>
      </tr>
    </thead>
    <tbody>
      {#each items as { id, ...rest } (id)}
        <tr transition:fade|local>
          <HistoryRow {id} {...rest} {nowInSecs} />
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <div class="emptyInfo">
    <p>no elements found</p>
  </div>
{/if}

<style>
  .table {
    transition: 0.4s;
    width: 100%;
    min-width: 400px;
    border-collapse: collapse;
    max-width: 1200px;
    color: var(--color-primary-6);
  }

  @media (max-width: 800px) {
    .table {
      font-size: 0.8em;
    }
  }

  .emptyInfo {
    opacity: 0.8;
    text-align: center;
    width: 100%;
  }

  p {
    color: var(--color-danger);
  }

  th {
    padding: 15px 20px;
    text-align: left;
    color: var(--color-success);
    border: 1px solid var(--color-primary);
    background-color: var(--color-primary);
  }

  tr:nth-child(even) {
    background-color: var(--color-primary-11);
  }

  tr:hover {
    background-color: var(--color-primary-3);
  }
</style>
