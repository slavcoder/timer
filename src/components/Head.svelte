<script>
  import { settings } from '../stores/settings.js'
  import { device } from '../stores/device.js'
  import Fonts from './Fonts.svelte'
  import ThemeDark from '../themes/ThemeDark.svelte'
  import ThemeLight from '../themes/ThemeLight.svelte'
  import ThemeArctic from '../themes/ThemeArctic.svelte'
  import ThemeCyberpunkLight from '../themes/ThemeCyberpunkLight.svelte'
  import ThemeCyberpunkDark from '../themes/ThemeCyberpunkDark.svelte'
  import ThemePinkRose from '../themes/ThemePinkRose.svelte'

  let innerWidth
  $: $device.innerWidth = innerWidth
  $: document.body.className = `theme_${$settings.theme}`
</script>

<svelte:window bind:innerWidth />

<svelte:head>
  <Fonts />
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
