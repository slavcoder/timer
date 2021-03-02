<script>
  import { settings, defaultSettings, options } from '../stores/settings.js'
  import { device } from '../stores/device.js'
  import { slide } from 'svelte/transition'
  import Modal from './Modal.svelte'
  import Alarm from './Alarm.svelte'
  import Time from './Time.svelte'
  import Select from './Select.svelte'
  import Heading from './Heading.svelte'
  let playAlarm = false

  function setToDefault() {
    $settings = defaultSettings
  }
</script>

<Modal name="settings">
  <Heading>Settings</Heading>

  <div class="container">
    <div class="settingOption">
      <h3>theme</h3>
      <Select bind:value={$settings.theme} options={options.theme} />
    </div>

    <div class="settingOption">
      <h3>font</h3>
      <Select bind:value={$settings.font} options={options.font} />
    </div>

    <div class="settingOption">
      <h3>font size</h3>
      <Select bind:value={$settings.fontSize} options={options.fontSize} />
    </div>

    <div class="settingOption">
      <h3>time variant</h3>
      <Select
        bind:value={$settings.timeVariant}
        options={options.timeVariant}
      />
      <div class="description">
        <h4 class="previewHeading">current variant preview:</h4>
        <p>1 day, 2 hours, 30 minutes and 45 seconds is presented as:</p>
        <div class="timeExample">
          <Time
            variant={$settings.timeVariant}
            timeObj={{ d: 1, h: 2, m: 30, s: 45 }}
          />
        </div>
      </div>
    </div>

    <div class="settingOption">
      <h3>progress bar</h3>
      <Select
        bind:value={$settings.progressBar}
        options={options.progressBar}
      />
    </div>

    <div class="settingOption">
      <h3>alarm</h3>
      <Select bind:value={$settings.alarm} options={options.alarm} />

      {#if $settings.alarm === 'enabled'}
        <div transition:slide|local>
          <h4>select alarm</h4>
          <button class="alarmTest" on:click={() => (playAlarm = !playAlarm)}>
            {playAlarm ? 'stop test' : 'alarm test'}
          </button>
          <Select
            bind:value={$settings.alarmSound}
            options={options.alarmSound}
          />
          <label>
            <p class="volume">volume: {$settings.alarmVolume}%</p>
            <input
              class="range"
              type="range"
              min="1"
              max="100"
              bind:value={$settings.alarmVolume}
            />
          </label>

          {#if playAlarm}
            <Alarm
              bind:play={playAlarm}
              sound={$settings.alarmSound}
              volume={$settings.alarmVolume}
            />
          {/if}
          <p>
            make sure that autoplay rule in your browser is enabled for this
            website
          </p>
        </div>
      {/if}
    </div>

    <div class="settingOption">
      <h3>date format</h3>
      <Select bind:value={$settings.dateFormat} options={options.dateFormat} />
      <div class="description">
        <h4 class="previewHeading">you can use date to calculate time</h4>
        <p>
          for example, you can write 2030 to calculate time up to 2030 year, or
          just any date with choosen format (default format is dd/mm/yyyy)
        </p>
      </div>
    </div>

    <div class="settingOption">
      <h3>time format</h3>
      <Select bind:value={$settings.clockTimeFormat} options={options.clockTimeFormat} />
      <div class="description">
        <p>
          for example, you can write 20:00 to calculate time up to closest 20:00
          hour, or 8:00pm if you prefer 12h format over 24h (default)
        </p>
      </div>
    </div>

    {#if !$device.isMobile && $device.innerWidth >= 800}
      <div class="settingOption">
        <span class="text-smaller">(desktop view only)</span>
        <h3>clock</h3>
        <Select bind:value={$settings.clock} options={options.clock} />
      </div>

      <div class="settingOption">
        <span class="text-smaller">(desktop view only)</span>
        <h3>digital clock</h3>
        <Select
          bind:value={$settings.digitalClock}
          options={options.digitalClock}
        />

        {#if $settings.digitalClock === 'enabled'}
          <div class="description" transition:slide|local>
            <h4 class="previewHeading">type</h4>
            <Select
              bind:value={$settings.digitalClockType}
              options={options.digitalClockType}
            />
          </div>
        {/if}
      </div>
    {/if}

    <div class="settingOption">
      <h3>restore default settings</h3>
      <button class="restore" on:click={setToDefault}>restore</button>
    </div>
  </div>
</Modal>

<style>
  h3 {
    margin-top: 0;
  }

  .settingOption {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2em;
    background-color: var(--bg-primary-2);
    color: var(--bg-primary-2-text-1);
    padding: 1em 0.5em;
  }

  .description {
    font-size: 0.9em;
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
    padding: 0.5em 1em;
    background-color: var(--bg-danger-1);
    color: var(--bg-danger-1-text-1);
    transition: 0.2s;
    border: none;
  }

  .restore:hover,
  .restore:focus {
    opacity: 0.8;
  }

  .previewHeading {
    color: var(--bg-primary-2-text-2);
  }

  .alarmTest {
    margin: 10px 0;
    min-width: 100px;
    display: block;
    border: none;
    background-color: var(--bg-success-1);
    color: var(--bg-success-1-text-1);
  }

  .alarmTest:hover,
  .alarmTest:focus {
    opacity: 0.8;
  }

  .volume {
    margin-bottom: 0.1em;
  }

  .range {
    margin: 0;
  }

  .text-smaller {
    font-size: 0.7em;
    font-weight: 400;
    margin-bottom: 0.5em;
  }
</style>
