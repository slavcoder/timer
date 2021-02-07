<script>
  import Settings from './components/Settings.svelte'
  import History from './components/History.svelte'
  import Nav from './components/Nav.svelte'
  import Header from './components/Header.svelte'
  import Form from './components/Form.svelte'
  import CountersList from './components/CountersList.svelte'
  import SavedList from './components/SavedList.svelte'
  import Clock from './components/Clock.svelte'
</script>

<Settings />
<History />
<Nav />
<Header />
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
    justify-content: space-between;
    align-items: flex-start;
    width: 1200px;
    max-width: 80%;
    margin: 50px auto;
    /* background-color: red; */
  }
  .container_saved {
    width: 25%;
    min-height: 200px;
    /* background-color: yellow; */
  }
  .container_counters {
    width: 45%;
    min-height: 200px;
    /* background-color: blue; */
  }
  .container_clock {
    width: 25%;
    min-height: 200px;
    /* background-color: purple; */
  }
</style>
