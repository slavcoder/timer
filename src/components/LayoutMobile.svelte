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

  .container_counters {
    width: 100%;
    min-height: 200px;
  }
</style>
