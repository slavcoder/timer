<script>
  import { settings, defaultSettings } from '../stores/settings.js'
  import { slide } from 'svelte/transition'
  import { alarmList } from '../data/alarmList.js'
  import Modal from './Modal.svelte'
  import Alarm from './Alarm.svelte'
  import Time from './Time.svelte'
  import Select from './Select.svelte'
  import Heading from './Heading.svelte'
  let playAlarm = false

  const options = {
    themes: [
      'dark',
      'light',
      'cyberpunk-dark',
      'cyberpunk-light',
      'arctic',
      'pink-rose',
    ],
    fonts: [
      'Russo One',
      'Roboto Condensed',
      'Noto Sans',
      'Mukta',
      'Fjalla One',
      'Teko',
      'Oswald',
      'Hammersmith One',
      'Francois One',
      'Acme',
      'Jockey One',
      'Ramabhadra',
      'Do Hyeon'
    ],
    fontSize: ['small', 'medium', 'large'],
    timeVariant: [1, 2],
    alarm: ['enabled', 'disabled'],
    alarmSound: Object.keys(alarmList),
    progressBar: ['enabled', 'disabled'],
    clock: ['enabled', 'disabled'],
    digitalClock: ['enabled', 'disabled'],
    digitalClockType: ['24h', '12h'],
    dateFormat: [
      'dd/mm/yyyy',
      'dd-mm-yyyy',
      'yyyy/mm/dd',
      'yyyy-mm-dd',
      'mm/dd/yyyy',
      'mm-dd-yyyy',
    ],
  }

  function setToDefault() {
    $settings = defaultSettings
  }
</script>

<Modal name="settings">
  <Heading>Settings</Heading>

  <div class="container">
    <div class="settingOption">
      <h3>theme</h3>
      <Select bind:value={$settings.theme} options={options.themes} />
    </div>

    <div class="settingOption">
      <h3>font</h3>
      <Select bind:value={$settings.font} options={options.fonts} />
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
            <input class="range" type="range" min=1 max=100 bind:value={$settings.alarmVolume}>
          </label>

          {#if playAlarm}
            <Alarm bind:play={playAlarm} sound={$settings.alarmSound} volume={$settings.alarmVolume} />
          {/if}
        </div>
      {/if}
    </div>

    <div class="settingOption">
      <h3>clock (desktop view)</h3>
      <Select bind:value={$settings.clock} options={options.clock} />
    </div>

    <div class="settingOption">
      <h3>digital clock (desktop view)</h3>
      <Select bind:value={$settings.digitalClock} options={options.digitalClock} />
      
      {#if $settings.digitalClock === 'enabled'}
      <div class="description" transition:slide|local>
        <h4 class="previewHeading">type</h4>
        <Select bind:value={$settings.digitalClockType} options={options.digitalClockType} />
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
      <h3>restore default settings</h3>
      <button class="restore" on:click={setToDefault}>restore</button>
    </div>
  </div>
</Modal>

<style>
  h3 {
    margin-top: 0;
    /* background-color: #fff; */
    /* border-left: .3em solid var(--color-primary-7); */
  }

  .settingOption {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2em;
    /* border-left: .3em solid var(--color-success); */
    background-color: var(--color-primary-10);
    padding: 1em 0.5em;
  }

  .description {
    /* margin: 10px 0; */
    /* padding: 10px; */
    /* background-color: var(--color-primary-3); */
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

  .previewHeading {
    color: var(--color-success);
  }

  .alarmTest {
    margin: 10px 0;
    min-width: 100px;
    display: block;
    cursor: pointer;
    border: none;
    color: var(--color-success);
    background-color: var(--color-primary-10);
  }

  .alarmTest:hover,
  .alarmTest:focus {
    color: var(--color-primary);
    background-color: var(--color-success);
  }

  .volume {
    margin-bottom: .1em;
  }

  .range {
    margin: 0;
  }
</style>
