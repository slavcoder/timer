const timeInSec = {
  d: 60 * 60 * 24,
  h: 60 * 60,
  m: 60,
  s: 1,
}

export function stringToSec(str) {
  str = str.trim()
  let sec = 0
  let flag = true
  const arr = str.split(' ').filter(el => el.trim().length)
  const correct = Object.keys(timeInSec)

  arr.forEach(el => {
    let key = el.substr(-1)
    let isCorrect = correct.includes(key)
    let num = Number(el.substr(0, el.length - 1))

    if (!isCorrect || !num) {
      flag = false
    } else {
      sec += num * timeInSec[key]
    }
  })

  return flag ? sec : false
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