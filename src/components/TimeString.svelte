<script>
  export let timeObj
  export let type
  let keys = Object.keys(timeObj)
</script>

<span class={type}>
  {#each keys as key (key)}
    {#if timeObj[key]}
      <span>
        {timeObj[key]}<span class="letter">{key}</span>&nbsp;
      </span>
    {/if}
  {/each}
</span>

<style>
  .letter {
    font-size: 0.8em;
  }
  .timeLeft {
    justify-content: flex-end;
  }

  .time,
  .timeLeft,
  .timeSaved,
  .history {
    display: flex;
    flex-wrap: wrap;
  }

</style>
