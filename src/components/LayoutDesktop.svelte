<script>
  import Form from './Form.svelte'
  import CountersList from './CountersList.svelte'
  import SavedList from './SavedList.svelte'
  import Clock from './Clock.svelte'
</script>

<Form />

<div class="container">
  <div class="container_saved">
    <SavedList />
  </div>
  <div class="container_counters">
    <CountersList />
  </div>
  <div class="container_clock">
    <Clock />
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

  .container_saved,
  .container_clock {
    width: 22.5%;
    min-height: 200px;
  }
  .container_counters {
    width: 55%;
    min-height: 200px;
  }
</style>
