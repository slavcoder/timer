<script>
  import { settings } from '../stores/settings.js'
  import { modal } from '../stores/modal.js'
  import { storage } from '../utilities/storage.js'
  import Modal from './Modal.svelte'
  import Select from './Select.svelte'
  import Heading from './Heading.svelte'

  const options = {
    themes: ['dark', 'light'],
    fonts: ['russo', 'roboto'],
  }

  $: storage.set('settings', $settings) 

</script>

{#if $modal.settings}
  <Modal name="settings">
    <Heading>Settings</Heading>

    <div class="container">
      <h3>theme</h3>
      <Select bind:value={$settings.theme} options={options.themes} />
      <h3>font</h3>
      <Select bind:value={$settings.font} options={options.fonts} />
    </div>

  </Modal>
{/if}

<style>
  .container {
    margin: 50px auto;
    width: 100%;
    max-width: 400px;
  }
</style>
