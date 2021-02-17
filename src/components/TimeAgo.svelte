<script>
  export let timeObj
  const keys = Object.keys(timeObj)

  let time = {
    d: 'day',
    h: 'hour',
    m: 'minute',
    s: 'second',
  }

  $: timeKey = keys.find(key => timeObj[key] > 0)
  $: if (!timeKey) timeKey = 's'
  $: plural = timeObj[timeKey] === 1 ? '' : 's'
</script>

<span>
  {timeObj[timeKey]}
  {time[timeKey]}{plural} ago
</span>
