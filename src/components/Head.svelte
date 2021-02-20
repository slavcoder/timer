<script>
  import { settings } from '../stores/settings.js'
  import { device } from '../stores/device.js'
  import Fonts from './Fonts.svelte'
  import ThemeDarkGrey from '../themes/ThemeDarkGrey.svelte'
  import ThemeLightGrey from '../themes/ThemeLightGrey.svelte'
  import ThemeArctic from '../themes/ThemeArctic.svelte'
  import ThemeCyberpunkLight from '../themes/ThemeCyberpunkLight.svelte'
  import ThemeCyberpunkDark from '../themes/ThemeCyberpunkDark.svelte'
  import ThemePinkRose from '../themes/ThemePinkRose.svelte'
  import ThemeDarkGoblin from '../themes/ThemeDarkGoblin.svelte'
  import ThemeDarkPurple from '../themes/ThemeDarkPurple.svelte'
  import ThemeDeadBlue from '../themes/ThemeDeadBlue.svelte'
  import ThemeMirage from '../themes/ThemeMirage.svelte'

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
    background-color: var(--bg-primary-1);
    padding: 0;
    height: auto;
  }

  :global(*) {
    box-sizing: border-box;
  }
</style>
