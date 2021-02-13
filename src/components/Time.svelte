<script>
  export let timeObj
  export let name = 'time'
  export let variant = 1
  let keys = Object.keys(timeObj)
  // let 
</script>

{#if variant === 1}
  <span class="{name} variant1">
    {#each keys as key (key)}
      {#if timeObj[key]}
        <span class="pair">
          {timeObj[key]}<span class="letter">{key}</span>
        </span>
      {/if}
    {/each}
  </span>
{:else if variant === 2}
  <span class="{name} variant2">
    {#each keys as key (key)}
      {#if key !== 'd' || timeObj[key]}
        <span class={key}
          >{timeObj[key] < 10 && key !== 'd' ? '0' : ''}{timeObj[key]}</span
        >{key === 'h' ? ':' : ''}
      {/if}
    {/each}
  </span>
{/if}

<style>
  .variant1 {
    display: flex;
    flex-wrap: wrap;
  }

  .variant2 {
    display: flex;
    flex-wrap: nowrap;
  }

  .variant1 .letter {
    font-size: 0.6em;
  }

  .variant1 .pair {
    margin-right: .2em;
  }
  
  .variant1 .pair:last-child {
    margin-right: 0;
  }

  .timeLeft {
    justify-content: flex-end;
  }

  .variant2 .d {
    font-size: 0.6em;
    margin-right: 0.2em;
    align-self: flex-end;
  }

  .variant2 .s {
    margin-left: 0.2em;
    font-size: 0.6em;
    align-self: flex-start;
  }
</style>
