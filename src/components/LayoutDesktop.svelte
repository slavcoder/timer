<script>
  import { settings } from '../stores/settings.js'
  import Form from './Form.svelte'
  import CountersList from './CountersList.svelte'
  import SavedList from './SavedList.svelte'
  import Clock from './Clock.svelte'
</script>

<Form />

<div class="container">
  <div class="saved">
    <SavedList />
  </div>
  <div class="counters">
    <CountersList />
  </div>
  <div class="sidebar">
    {#if $settings.clock === 'enabled'}
      <Clock />
    {/if}
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 1200px;
    max-width: 80%;
    margin: 50px auto;
  }
  
  @media (min-width: 1600px) {
    .container {
      width: 90%;
      max-width: 1500px;
    }
  }

  @media (min-width: 2400px) {
    .container {
      width: 90%;
      max-width: 1700px;
    }
  }

  .saved,
  .sidebar {
    width: 22.5%;
    min-height: 200px;
  }
  
  .counters {
    width: 54%;
    min-height: 200px;
  }
</style>
