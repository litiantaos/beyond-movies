export const formatYear = (dateStr) => {
  const date = new Date(dateStr)
  return date.getFullYear()
}

export const formatRating = (num) => {
  return num.toFixed(2)
}

export const formatTime = (minutes) => {
  // seconds
  const seconds = minutes * 60
  let secondsLeft = seconds

  // hours
  const hours = Math.floor(secondsLeft / 3600)
  secondsLeft = secondsLeft % 3600

  // mins
  const mins = Math.floor(secondsLeft / 60)
  secondsLeft = secondsLeft % 60

  return `${hours ? `${hours}h` : ''} ${mins}min`
}

export const formatDate = (timestamp, format = 'yyyy-MM-dd hh:mm') => {
  const date = new Date(timestamp)

  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const day = `0${date.getDate()}`.slice(-2)
  const hours = `0${date.getHours()}`.slice(-2)
  const minutes = `0${date.getMinutes()}`.slice(-2)

  return format
    .replace(/yyyy/g, year)
    .replace(/MM/g, month)
    .replace(/dd/g, day)
    .replace(/hh/g, hours)
    .replace(/mm/g, minutes)
}

export const throttle = (func, wait) => {
  let prev = 0
  return (...args) => {
    let now = Date.now()
    if (now - prev >= wait) {
      func.apply(this, args)
      prev = now
    }
  }
}
