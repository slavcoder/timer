<script>
  import { device } from '../stores/device.js'
  import { settings } from '../stores/settings.js'

  let innerWidth
  $: $device.innerWidth = innerWidth
  $: document.body.className = `theme_${$settings.theme} font_${$settings.font}`
</script>

<svelte:window bind:innerWidth />

<svelte:head>
  {#if $settings.font === 'russo'}
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap"
      rel="stylesheet"
    />
  {/if}

  {#if $settings.font === 'roboto'}
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
      rel="stylesheet"
    />
  {/if}
</svelte:head>

<style>
  :global(body.font_russo) {
    font-family: 'Russo One', sans-serif;
  }

  :global(body.font_roboto) {
    font-family: 'Roboto', sans-serif;
  }

  :global(body) {
    background-color: var(--color-primary-4);
    color: var(--color-primary-7);
    padding: 0;
    height: auto;
  }

  :global(*) {
    box-sizing: border-box;
  }
</style>
