<script>
  import { modal } from '../stores/modal.js'
  import Modal from './Modal.svelte'
  import Form from './Form.svelte'
  import CountersList from './CountersList.svelte'
  import SavedList from './SavedList.svelte'
</script>

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
    transition: 0.2s;
    background-color: var(--bg-success-1);
    color: var(--bg-success-1-text-1);
  }

  .openButton {
    width: 200px;
    background-color: var(--bg-primary-3);
    color: var(--bg-primary-3-text-1);
    border: none;
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
    margin: 10px auto;
  }

  .container_counters {
    width: 100%;
    min-height: 200px;
  }
</style>
