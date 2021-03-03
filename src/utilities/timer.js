const timeInSec = {
  d: 60 * 60 * 24,
  h: 60 * 60,
  m: 60,
  s: 1,
}

function destructTimeItem(el) {
  const key = el.substr(-1)
  const number = el.substr(0, el.length - 1)

  return {
    key: key,
    number: number,
  }
}

function changeDateFormat(date, format) {
  const dateFormat = {
    'dd/mm/yyyy': date => date.split('/').reverse().join('-'),
    'dd-mm-yyyy': date => date.split('-').reverse().join('-'),
    'yyyy/mm/dd': date => date.split('/').join('-'),
    'yyyy-mm-dd': date => date,
    'mm/dd/yyyy': date => {
      const splitted = date.split('/')
      splitted.unshift(splitted.pop())
      return splitted.join('-')
    },
    'mm-dd-yyyy': date => {
      const splitted = date.split('-')
      splitted.unshift(splitted.pop())
      return splitted.join('-')
    },
  }

  return dateFormat[format](date)
}

function validateTime(el) {
  const correct = Object.keys(timeInSec)
  const destructed = destructTimeItem(el)
  const keyIsCorrect = correct.includes(destructed.key)
  const number = Number(destructed.number)
  let numberIsCorrect = typeof Number(destructed.number) === 'number'
  numberIsCorrect = numberIsCorrect && !isNaN(destructed.number)
  if (!keyIsCorrect || !numberIsCorrect) return false
  const secs = number * timeInSec[destructed.key]
  return { secs }
}

function validateDate(el, format, clockTimeFormat) {
  const arr = el.split('_')
  let clockTime = { hours: 0, minutes: 0 }

  if (arr.length === 2) {
    let newClockTime = validateClockTime(arr[1], clockTimeFormat)
    if (!newClockTime) return false
    clockTime.hours = newClockTime.hours
    clockTime.minutes = newClockTime.minutes
  }

  const dateFormated = changeDateFormat(arr[0], format)
  const dateFormatedArr = dateFormated.split('-')

  for (let i = 0; i < dateFormatedArr.length; i++) {
    const item = dateFormatedArr[i]
    if (i === 0 && item.length !== 4) return false
    if ((i === 1 || i === 2) && item.length !== 2) return false
  }

  if (!Boolean(Date.parse(dateFormated))) return false
  const date = new Date(dateFormated)
  date.setHours(clockTime.hours)
  date.setMinutes(clockTime.minutes)
  const secs = date.getTime() / 1000
  return { secs }
}

function convertClockTimeHourFormat(hours, key) {
  if (key === 'am') return hours === 12 ? 0 : hours
  return hours === 12 ? 12 : hours + 12
}

function validateClockTime(item, clockTimeFormat) {
  let key

  if (clockTimeFormat === '12h') {
    key = item.substr(-2)
    if (key !== 'pm' && key !== 'am') return false
    item = item.substr(0, item.length - 2)
  }

  const arr = item.split(':')
  if (arr.length > 2) return false
  let hours = Number(arr[0])
  const minutes = arr[1] ? Number(arr[1]) : 0
  if (hours !== Math.floor(hours)) return false
  if (minutes !== Math.floor(minutes)) return false
  if (isNaN(hours) || isNaN(minutes)) return false

  if (clockTimeFormat === '12h') {
    if (hours > 12 || hours < 1) return false
    if (minutes > 59 || minutes < 0) return false
    hours = convertClockTimeHourFormat(hours, key)
  } else {
    if (hours > 23 || hours < 0) return false
    if (minutes > 59 || minutes < 0) return false
  }

  return { hours, minutes }
}

export function stringToSec(str, dateFormat, clockTimeFormat) {
  str = str.trim()
  let secs = 0
  let error = false
  let blocked = false
  let errorMessage = ''
  const arr = str.split(' ').filter(el => el.trim().length)
  const arrLength = arr.length

  for (let i = 0; i < arrLength; i++) {
    const item = arr[i]
    const date = validateDate(item, dateFormat, clockTimeFormat)
    const time = validateTime(item)
    const clockTime = validateClockTime(item, clockTimeFormat)

    if (item === 'b' || item === 'block') {
      blocked = true
      continue
    }

    if (date) {
      const nowInSecs = Date.now() / 1000
      secs += date.secs - nowInSecs
      continue
    }

    if (time) {
      secs += time.secs
      continue
    }

    if (clockTime) {
      const nowInSecs = Date.now() / 1000
      const date = new Date()
      date.setHours(clockTime.hours)
      date.setMinutes(clockTime.minutes)
      date.setSeconds(0)
      const dateInSecs = date.getTime() / 1000
      const diff = dateInSecs - nowInSecs > 0 ? 0 : timeInSec.d
      secs += dateInSecs - nowInSecs + diff
      continue
    }

    error = true
    errorMessage = 'incorrect format'
    break
  }

  if (!error && secs < 1) {
    error = true
    errorMessage = '1 second is minimum time'
  }

  if (!error && secs > timeInSec.d * 9999) {
    error = true
    errorMessage = '9 999 days is max time'
  }

  return {
    error,
    errorMessage,
    secs: Math.round(secs),
    blocked,
  }
}

export function secsToObj(sec) {
  const time = {}
  time.d = Math.floor(sec / timeInSec.d)
  sec -= time.d * timeInSec.d
  time.h = Math.floor(sec / timeInSec.h)
  sec -= time.h * timeInSec.h
  time.m = Math.floor(sec / timeInSec.m)
  time.s = sec - time.m * timeInSec.m

  return time
}

function zeroBefore(num) {
  return num > 9 ? num : '0' + num
}

const formatDate = {
  'dd/mm/yyyy': (y, m, d) => `${zeroBefore(d)}/${zeroBefore(m)}/${y}`,
  'dd-mm-yyyy': (y, m, d) => `${zeroBefore(d)}-${zeroBefore(m)}-${y}`,
  'yyyy/mm/dd': (y, m, d) => `${y}/${zeroBefore(m)}/${zeroBefore(d)}`,
  'yyyy-mm-dd': (y, m, d) => `${y}-${zeroBefore(m)}-${zeroBefore(d)}`,
  'mm/dd/yyyy': (y, m, d) => `${zeroBefore(m)}/${zeroBefore(d)}/${y}`,
  'mm-dd-yyyy': (y, m, d) => `${zeroBefore(m)}-${zeroBefore(d)}-${y}`,
}

export function getFormatedDateTime(dateInSecs, dateFormat, timeFormat) {
  let res = ''
  const today = new Date()
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth() + 1
  const todayDay = today.getDate()

  const date = new Date(dateInSecs * 1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  if (todayYear !== year || todayMonth !== month || todayDay !== day) {
    res += formatDate[dateFormat](year, month, day) + ', '
  } else {
    res += 'today, '
  }

  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  if (timeFormat === '12h') {
    const dayPart = hours < 12 ? 'AM' : 'PM'
    const hoursFormated = hours % 12 ? hours % 12 : '12'
    res += `${zeroBefore(hoursFormated)}:${zeroBefore(minutes)}:${zeroBefore(
      seconds
    )} ${dayPart}`
  } else {
    res += `${zeroBefore(hours)}:${zeroBefore(minutes)}:${zeroBefore(seconds)}`
  }

  return res
}
