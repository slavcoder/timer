<script>
  import { device } from './stores/device.js'
  import { modal } from './stores/modal.js'
  import Head from './components/Head.svelte'
  import CookiesInfo from './components/CookiesInfo.svelte'
  import LayoutMobile from './components/LayoutMobile.svelte'
  import LayoutDesktop from './components/LayoutDesktop.svelte'
  import Storage from './components/Storage.svelte'
  import Wrapper from './components/Wrapper.svelte'
  import Settings from './components/Settings.svelte'
  import History from './components/History.svelte'
  import About from './components/About.svelte'
  import Nav from './components/Nav.svelte'
  import Header from './components/Header.svelte'
</script>

<Storage />
<Head />

<Wrapper>
  {#if $modal.settings} <Settings /> {/if}
  {#if $modal.history} <History /> {/if}
  {#if $modal.about} <About /> {/if}

  <Nav />
  <Header />

  <main>
    {#if $device.isMobile || $device.innerWidth < 800}
      <LayoutMobile />
    {:else if $device.innerWidth >= 800}
      <LayoutDesktop />
    {/if}
  </main>

  {#if $modal.cookiesInfo}
    <CookiesInfo />
  {/if}
</Wrapper>
