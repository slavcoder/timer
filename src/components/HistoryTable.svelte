<script>
  import HistoryRow from './HistoryRow.svelte'
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
        <HistoryRow {id} {...rest} {nowInSecs} />
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
    color: var(--bg-primary-1-text-1);
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
    color: var(--bg-primary-1-text-3);
  }

  th {
    padding: 15px 20px;
    text-align: left;
    background-color: var(--bg-primary-2);
    color: var(--bg-primary-2-text-1);
  }
</style>
