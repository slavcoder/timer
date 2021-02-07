<script>
  import { fade } from 'svelte/transition'
  import { onMount } from 'svelte'
  export let close
  let closeButton

  onMount(() => closeButton.focus())
</script>

<div class="modal" transition:fade >
  <button bind:this={closeButton} on:click={close}>close</button>
  <slot></slot>
</div>

<style>
  .modal {
    width: 500px;
    max-width: 80%;
    padding: 50px 20px;
    background-color: red;
    position: fixed;
    top: 10%;
    left: 10%;
    z-index: 100;
  }

</style>