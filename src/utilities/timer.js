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

function validateTimeFormat(el) {
  const correct = Object.keys(timeInSec)
  const destructed = destructTimeItem(el)
  const keyIsCorrect = correct.includes(destructed.key)
  let numberIsCorrect = typeof Number(destructed.number) === 'number'
  numberIsCorrect = numberIsCorrect && !isNaN(destructed.number)
  return keyIsCorrect && numberIsCorrect
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

function validateDateFormat(el, format) {
  return Boolean(Date.parse(changeDateFormat(el, format)))
}

export function stringToSec(str, dateFormat) {
  str = str.trim()
  let secs = 0
  let error = false
  let errorMessage = ''
  const arr = str.split(' ').filter(el => el.trim().length)
  const arrLength = arr.length

  for (let i = 0; i < arrLength; i++) {
    const item = arr[i]
    const validDateFormat = validateDateFormat(item, dateFormat)
    const validTimeFormat = validateTimeFormat(item)

    if (validDateFormat) {
      const nowInSecs = Date.now() / 1000
      const dateInSecs = Date.parse(changeDateFormat(item, dateFormat)) / 1000
      secs += Math.floor(dateInSecs - nowInSecs)
      continue
    }

    if (validTimeFormat) {
      const destructed = destructTimeItem(item)
      secs += Number(destructed.number) * timeInSec[destructed.key]
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
    errorMessage = '9,999 days is max time'
  }

  return {
    error: error,
    errorMessage: errorMessage,
    secs: Math.round(secs),
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
