<script>
  import {device} from './stores/device.js'
  import Settings from './components/Settings.svelte'
  import History from './components/History.svelte'
  import Modal from './components/Modal.svelte'
  import Nav from './components/Nav.svelte'
  import Header from './components/Header.svelte'
  import Form from './components/Form.svelte'
  import CountersList from './components/CountersList.svelte'
  import SavedList from './components/SavedList.svelte'
  import Clock from './components/Clock.svelte'
  let innerWidth
  $: $device.innerWidth = innerWidth
  let open = false
</script>

<svelte:window bind:innerWidth />
<Settings />
<History />
<Nav />
<Header />

{#if $device.isMobile || $device.innerWidth < 800}
  <div class="openContainer">
    <button on:click={() => (open = !open)} class="open">add new</button>
  </div>
  {#if open}
    <Modal close={() => (open = false)}>
      <div class="modalInnerContainer">
        <Form modal={true} bind:open />
        <SavedList modal={true} />
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

<style>
  .modalInnerContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  
  .open:hover,
  .open:focus {
    opacity: .8;
    transition: opacity .2s;
  }

  .open {
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
    /* background-color: red; */
  }

  .container_saved {
    width: 100%;
    min-height: 100px;
    /* background-color: yellow; */
  }
  .container_counters {
    width: 100%;
    min-height: 200px;
    /* background-color: blue; */
  }
  .container_clock {
    width: 100%;
    min-height: 200px;
    /* background-color: purple; */
  }

  @media (min-width: 800px) {
    .container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: row;
      width: 1200px;
      max-width: 80%;
    }

    .container_saved {
      width: 22.5%;
      min-height: 200px;
      /* background-color: yellow; */
    }
    .container_counters {
      width: 50%;
      min-height: 200px;
      /* background-color: blue; */
    }
    .container_clock {
      width: 22.5%;
      min-height: 200px;
      /* background-color: purple; */
    }
  }
</style>
