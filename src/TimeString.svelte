<script>
  export let timeObj
  export let type
  let keys = Object.keys(timeObj)
</script>

<p class={type}>
  {#each keys as key (key)}
    {#if timeObj[key]}
      {timeObj[key]}{key}&nbsp;
    {/if}
  {/each}
</p>

<style>
  .time {
    opacity: 0.8;
  }
  .timeLeft {
    font-weight: bold;
  }
</style>
