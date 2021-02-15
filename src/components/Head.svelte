<script>
  import { settings } from '../stores/settings.js'
  import { device } from '../stores/device.js'
  import ThemeDark from '../themes/ThemeDark.svelte'
  import ThemeLight from '../themes/ThemeLight.svelte'
  import ThemeFancy from '../themes/ThemeFancy.svelte'

  let innerWidth
  $: $device.innerWidth = innerWidth
  $: document.body.className = `theme_${$settings.theme}`
</script>

<svelte:window bind:innerWidth />

<svelte:head>
  <title>Timer</title>

  {#if $settings.font === 'russo'}
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap"
      rel="stylesheet"
    />
    <style>
      body {font-family: 'Russo One', sans-serif;}
    </style>
  {/if}

  {#if $settings.font === 'roboto'}
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
    href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
    rel="stylesheet"
    />
    <style>
      body {font-family: 'Russo One', sans-serif;}
    </style>
  {/if}
</svelte:head>

<style>
  :global(body) {
    background-color: var(--color-primary-4);
    padding: 0;
    height: auto;
  }

  :global(*) {
    box-sizing: border-box;
  }
</style>
