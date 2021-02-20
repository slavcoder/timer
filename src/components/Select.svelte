<script>
  export let value
  export let options
</script>

<div class="selectContainer">
  <select bind:value>
    {#each options as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
</div>

<style>
  select {
    border: none;
    transition: 0.2s;
    background-color: var(--bg-primary-1);
    color: var(--bg-primary-1-text-1);
    border: 1px solid var(--bg-primary-1-border-1);
    padding-right: 30px;
    text-align: inherit;
    appearance: none;
    margin: 0;
    width: 100%;
  }

  select:hover,
  select:focus {
    background-color: var(--bg-primary-2);
    color: var(--bg-primary-2-text-1);
    outline: none;
  }
  
  .selectContainer {
    position: relative;
  }

  .selectContainer:after {
    z-index: 150;
    content: '';
    position: absolute;
    right: 10px;
    top: calc(50% - 4px);
    border: solid var(--bg-primary-1-decoration-1);
    border-width: 0 4px 4px 0;
    display: block;
    padding: 3px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
</style>
