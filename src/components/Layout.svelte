<script>
  import { device } from '../stores/device.js'
  import { modal } from '../stores/modal.js'
  import Settings from './Settings.svelte'
  import History from './History.svelte'
  import About from './About.svelte'
  import Modal from './Modal.svelte'
  import Nav from './Nav.svelte'
  import Header from './Header.svelte'
  import Form from './Form.svelte'
  import CountersList from './CountersList.svelte'
  import SavedList from './SavedList.svelte'
  import Clock from './Clock.svelte'
  import CookiesInfo from './CookiesInfo.svelte'
</script>

{#if $modal.settings} <Settings /> {/if}
{#if $modal.history} <History /> {/if}
{#if $modal.about} <About /> {/if}

<Nav />
<Header />

{#if $device.isMobile || $device.innerWidth < 800}
  <div class="openContainer">
    <button on:click={() => ($modal.addPanel = true)} class="openButton">
      add new
    </button>
  </div>
  {#if $modal.addPanel}
    <Modal name="addPanel">
      <div class="modalInnerContainer">
        <Form />
        <SavedList inModal={true} />
      </div>
    </Modal>
  {/if}
  <div class="container">
    <div class="container_counters">
      <CountersList />
    </div>
  </div>
{:else}
  <Form />
  <div class="container">
    <div class="container_saved">
      <SavedList />
    </div>
    <div class="container_counters">
      <CountersList />
    </div>
    <div class="container_clock">
      <Clock />
    </div>
  </div>
{/if}

{#if $modal.cookiesInfo}
  <CookiesInfo />
{/if}

<style>
  .modalInnerContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .openButton:hover,
  .openButton:focus {
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  .openButton {
    width: 200px;
    color: var(--color-success);
    background-color: var(--color-primary-2);
    border: none;
    cursor: pointer;
  }

  .openContainer {
    display: flex;
    justify-content: center;
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin: 50px auto;
  }

  .container_saved {
    width: 100%;
    min-height: 100px;
  }
  .container_counters {
    width: 100%;
    min-height: 200px;
  }
  .container_clock {
    width: 100%;
    min-height: 200px;
  }

  @media (min-width: 800px) {
    .container {
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: row;
      width: 1200px;
      max-width: 80%;
    }

    .container_saved,
    .container_clock {
      width: 22.5%;
      min-height: 200px;
    }
    .container_counters {
      width: 50%;
      min-height: 200px;
    }
  }
</style>
