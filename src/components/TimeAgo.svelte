<script>
  export let timeObj
  let keys = Object.keys(timeObj)

  let time = {
    d: 'day',
    h: 'hour',
    m: 'minute',
    s: 'second',
  }

  let timeKey = keys.find(key => timeObj[key] > 0)
  if(!timeKey) timeKey = 's'
  let plural = timeObj[timeKey] === 1 ? '' : 's'
</script>

<span>
  {timeObj[timeKey]} {time[timeKey]}{plural} ago
</span>
