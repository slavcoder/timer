<script>
  import { now } from '../stores/time.js'
  import { history } from '../stores/history.js'
  import Modal from './Modal.svelte'
  import Select from './Select.svelte'
  import Heading from './Heading.svelte'
  import HistoryTable from './HistoryTable.svelte'
  let value = 'last 24 hours'
  let nowInSecs = Math.floor($now.getTime() / 1000)

  let optionsObj = {
    'last 15 minutes': 60 * 15,
    'last hour': 60 * 60,
    'last 24 hours': 24 * 60 * 60,
    'last 7 days': 24 * 60 * 60 * 7,
    'last 30 days': 24 * 60 * 60 * 30,
    'all time': 0,
  }

  let options = Object.keys(optionsObj)

  $: items = $history
    .filter(el => {
      if (!optionsObj[value]) return el
      return el.timeInSecsOnFinish >= nowInSecs - optionsObj[value]
    })
    .reverse()

  function clearHistory() {
    $history = $history.filter(el => !items.includes(el))
  }
</script>

<Modal name="history">
  <Heading>History</Heading>

  <div class="date">
    <button class="clear" on:click={clearHistory}>clear</button>
    <Select bind:value {options} />
  </div>
  <div class="content">
    <HistoryTable {items} {nowInSecs} />
  </div>
</Modal>

<style>
  .clear {
    margin: 0 10px 0 0;
    background-color: var(--color-primary-5);
    color: var(--color-primary-12);
    border: none;
    transition: color 0.2s;
    cursor: pointer;
  }

  .clear:hover,
  .clear:focus {
    color: var(--color-success);
  }

  .date {
    display: flex;
    justify-content: center;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
    padding: 0 20px;
    width: 100%;
    overflow: auto;
  }

  @media (max-width: 800px) {
    .content {
      justify-content: flex-start;
    }
  }
</style>
