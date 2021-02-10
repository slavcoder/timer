<script>
  import { history } from '../stores/history.js'
  // import { storage } from '../utilities/storage.js'
  import { now } from '../stores/time.js'
  import Modal from './Modal.svelte'
  import HistoryTable from './HistoryTable.svelte'
  import { storage } from '../utilities/storage.js';
  let dateRange = 'hour24'
  let nowInSecs = Math.floor($now.getTime() / 1000)

  let dateRangeInSecs = {
    min15: 60 * 15,
    hour: 60 * 60,
    hour24: 24 * 60 * 60,
    day7: 24 * 60 * 60 * 7,
    day30: 24 * 60 * 60 * 30,
    all: 0,
  }

  $: items = $history.filter(el => {
    if(!dateRangeInSecs[dateRange]) return el
    return el.timeInSecsOnFinish >= nowInSecs - dateRangeInSecs[dateRange]
  }).reverse()

  function clearHistory() {
    $history = $history.filter(el => !items.includes(el))
    storage.set('history', $history)
  }

</script>

<Modal name="history">
  <h2 class="heading">History</h2>

  <div class="date">
    <button class="clear" on:click={clearHistory}>clear</button>
    <div class="selectContainer">
      <select bind:value={dateRange}>
        <option value="min15">last 15 minutes</option>
        <option value="hour">last hour</option>
        <option value="hour24">last 24 hours</option>
        <option value="day7">last 7 days</option>
        <option value="day30">last 30 days</option>
        <option value="all">all time</option>
      </select>
    </div>
  </div>
  <div class="content">
    <HistoryTable {items} {nowInSecs}/>
  </div>
</Modal>

<style>
  .heading {
    text-align: center;
  }

  .clear {
    margin: 0 10px 0 0;
    background-color: var(--color-primary-5);
    color: var(--color-primary-12);
    border: none;
    transition: color .2s;
    cursor: pointer;
  }

  .clear:hover,
  .clear:focus {
    color: var(--color-success);
  }

  .date {
    display: flex;
    justify-content: center;
    /* align-items: stretch; */
    /* align-content: stretch; */
  }

  select:hover,
  select:focus {
    background-color: var(--color-primary-8);
    outline: none;
  }

  select {
    /* padding: 6px; */
    border: none;
    transition: 0.2s;
    background-color: var(--color-primary-7);
    color: var(--color-primary-3);
    /* min-width: 200px; */
    padding-right: 30px;
    text-align: center;
    appearance: none;
    margin: 0;
    cursor: pointer;
  }

  .selectContainer {
    position: relative;
  }

  .selectContainer:after {
    z-index: 150;
    content: '';
    position: absolute;
    right: 10px;
    top: calc(50% - 4px);
    border: solid var(--color-primary-3);
    border-width: 0 4px 4px 0;
    display: block;
    padding: 3px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
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
