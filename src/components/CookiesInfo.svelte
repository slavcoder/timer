<script>
  import { modal } from '../stores/modal.js'
  import { fly } from 'svelte/transition'
  import { storage } from '../utilities/storage.js'
  import Link from './Link.svelte'

  function accept() {
    storage.set('cookiesAccepted', true)
    $modal.cookiesInfo = false
  }
</script>

<div class="container" transition:fly={{ y: 100 }}>
  <p>
    This website is using your browser's <Link
      href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
      >local storage</Link
    > to save your settings, counters, history, etc.
  </p>
  <button on:click={accept} class="accept"> ok </button>
</div>

<style>
  .container {
    text-align: center;
    position: fixed;
    bottom: 0;
    min-height: 100px;
    left: 0;
    width: 100%;
    background-color: var(--color-primary-2);
    border-top: 1px solid var(--color-primary-5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px 50px;
  }

  button {
    margin: 0;
    background-color: var(--color-primary-4);
    color: var(--color-success);
    border: 0;
    margin: 10px;
    cursor: pointer;
    transition: 0.2s;
    padding: 5px 10px;
  }

  p {
    margin: 10px;
  }

  button:hover,
  button:focus {
    background-color: var(--color-primary-9);
    color: var(--color-primary-7);
  }
</style>
