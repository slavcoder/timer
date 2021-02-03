<script>
  export let timeObj
  export let type
  let keys = Object.keys(timeObj)
</script>

<span class={type}>
  {#each keys as key (key)}
    {#if timeObj[key]}
      {timeObj[key]}{key}&nbsp;
    {/if}
  {/each}
</span>

<style>
  .time {
    opacity: 0.8;
  }
  .timeLeft {
    font-weight: bold;
  }
</style>
