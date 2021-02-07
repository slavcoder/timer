<script>
  import { history } from '../stores/history.js'
  import Modal from './Modal.svelte'

</script>

{#if $history.open}
  <Modal close={() => $history.open = false}>
    <h2>History</h2>
    
  </Modal>
{/if}