const timeInSec = {
  d: 60 * 60 * 24,
  h: 60 * 60,
  m: 60,
  s: 1,
}

export function stringToSec(str) {
  str = str.trim()
  let secs = 0
  let error = false
  let errorMessage = ''
  const arr = str.split(' ').filter(el => el.trim().length)
  const arrLength = arr.length
  const correct = Object.keys(timeInSec)

  for (let i = 0; i < arrLength; i++) {
    const key = arr[i].substr(-1)
    const number = arr[i].substr(0, arr[i].length - 1)
    const keyIsCorrect = correct.includes(key)
    const numberIsCorrect = Number(number)

    if (keyIsCorrect && numberIsCorrect) {
      secs += number * timeInSec[key]
    } else {
      error = true
      errorMessage = 'wrong format'
      break
    }
  }

  if (!error && secs < 1) {
    error = true
    errorMessage = '1 second is minimum time'
  }

  if (!error && secs > timeInSec.d * 1000) {
    error = true
    errorMessage = '1000 days is max time'
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
