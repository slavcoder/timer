<script>
  import { slide } from 'svelte/transition'
  import { onMount } from 'svelte'
  import Icon from './Icon.svelte'
  export let close
  let modal

  onMount(() => modal.focus())
</script>

<div class="modal" transition:slide bind:this={modal} tabindex="0">
  <button  on:click={close} class="close">
    <Icon name="close" />
  </button>
  <slot />
</div>

<style>
  .modal {
    width: 500px;
    max-width: 80%;
    padding: 50px 20px;
    background-color: var(--color-primary-4);
    border: 1px solid var(--color-primary-7);
    /* box-shadow: 3px 3px 15px var(--color-primary-2); */
    border-top: none;
    position: fixed;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 100;
  }

  .close {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: transparent;
    color: var(--color-danger-2);
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
  }

  .close:hover,
  .close:focus {
    color: var(--color-primary-9);
  }
</style>
