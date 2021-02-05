<script>
  // import GlobalSettings from './GlobalSettings.svelte'
  import Head from './settings/Head.svelte'
  import Styles from './settings/Styles.svelte'
  import Nav from './Nav.svelte'
  import Header from './Header.svelte'
  import Form from './Form.svelte'
  import CountersList from './CountersList.svelte'
  import SavedList from './SavedList.svelte'

  document.body.classList.add('theme_dark')
</script>

<!-- <GlobalSettings /> -->
<Head />
<Styles />

<Nav />
<Header />
<Form />
<CountersList />
<SavedList />

<style>
</style>