<script>
  import { slide, fade } from 'svelte/transition'
  import { onMount } from 'svelte'
  import { modal } from '../stores/modal.js'
  import Icon from './Icon.svelte'
  export let name
  let container

  function close() {
    $modal[name] = false
  }

  function closeOnEsc(e) {
    if(e.keyCode == 27) close()
  }

  onMount(() => container.focus())
</script>

<svelte:body on:keydown={closeOnEsc} />

<div class="cover" transition:fade on:click={close}></div>
<div class="container" transition:slide bind:this={container} tabindex="0">
  <button on:click={close} class="close">
    <Icon name="close" />
  </button>
  <slot />
</div>

<style>
  .cover {
    z-index: 100;
    background-color: var(--color-primary);
    opacity: .8;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .container {
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
    z-index: 101;
  }

  .container:focus {
    outline: none;
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
