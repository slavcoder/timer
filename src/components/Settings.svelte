<script>
  import { settings, defaultSettings } from '../stores/settings.js'
  import Modal from './Modal.svelte'
  import Time from './Time.svelte'
  import Select from './Select.svelte'
  import Heading from './Heading.svelte'

  const options = {
    themes: ['dark', 'light'],
    fonts: ['russo', 'roboto'],
    fontSize: ['small', 'medium', 'large'],
    timeVariant: [1, 2],
  }

  function setToDefault() {
    $settings = defaultSettings
  }
</script>

<Modal name="settings">
  <Heading>Settings</Heading>

  <div class="container">
    <h3>theme</h3>
    <Select bind:value={$settings.theme} options={options.themes} />

    <h3>font</h3>
    <Select bind:value={$settings.font} options={options.fonts} />

    <h3>font size</h3>
    <Select bind:value={$settings.fontSize} options={options.fontSize} />

    <h3>time variant</h3>
    <Select bind:value={$settings.timeVariant} options={options.timeVariant} />
    <div class="timePreview">
      <p>current variant preview:</p>
      <p>1 day, 2 hours, 30 minutes and 45 seconds is presented as:</p>
      <div class="timeExample">
        <Time variant={$settings.timeVariant} timeObj={{d:1,h:2,m:30,s:45}} />
      </div>
    </div>

    <h3>restore default settings</h3>
    <button class="restore" on:click={setToDefault}>restore</button>
  </div>
</Modal>

<style>
  .timePreview {
    margin: 20px 0;
    padding: 10px;
    background-color: var(--color-primary-3);
    font-size: .9em;
  }

  .timeExample {
    font-size: 2em;
  }

  .container {
    margin: 50px auto;
    width: 100%;
    max-width: 400px;
  }

  .restore {
    width: 100%;
    color: var(--color-danger);
    background-color: var(--color-primary-10);
    transition: 0.2s;
    cursor: pointer;
    border: none;
  }

  .restore:hover,
  .restore:focus {
    color: var(--color-primary);
    background-color: var(--color-danger-2);
  }
</style>
