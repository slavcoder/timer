<script>
  import { settings } from '../stores/settings.js'
  import Modal from './Modal.svelte'
  import Colors from '../themes/Colors.svelte'
  import ThemeDark from '../themes/ThemeDark.svelte'
  import ThemeLight from '../themes/ThemeLight.svelte'

  $: document.body.className = `theme_${$settings.theme} font_${$settings.font}`
</script>

{#if $settings.open}
<Modal close={() => $settings.open = false}>
  <select bind:value={$settings.theme}>
    <option value="dark">dark</option>
    <option value="light">light</option>
  </select>
  
  <select bind:value={$settings.font}>
    <option value="russo">russo</option>
    <option value="roboto">roboto</option>
  </select>
</Modal>
{/if}

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
    color: var(--color-primary-9);
    padding: 0;
    height: auto;
  }

  :global(*) {
    box-sizing: border-box;
  }
</style>
