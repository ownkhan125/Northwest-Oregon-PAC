const MONTH_LONG = {
  Jan: 'January', Feb: 'February', Mar: 'March', Apr: 'April',
  May: 'May', Jun: 'June', Jul: 'July', Aug: 'August',
  Sep: 'September', Oct: 'October', Nov: 'November', Dec: 'December',
}

const stripLeadingZero = (day) => String(parseInt(day, 10))

const isValid = (d) => d && d.month && d.day && d.year

export const formatEventDate = (event, { long = false } = {}) => {
  const start = event?.date
  const end = event?.endDate
  if (!isValid(start)) return ''

  const monthOf = (d) => (long ? MONTH_LONG[d.month] || d.month : d.month)
  const dayOf = (d) => stripLeadingZero(d.day)

  if (!isValid(end) || (end.month === start.month && end.day === start.day && end.year === start.year)) {
    return `${monthOf(start)} ${dayOf(start)}, ${start.year}`
  }

  if (start.year !== end.year) {
    return `${monthOf(start)} ${dayOf(start)}, ${start.year} – ${monthOf(end)} ${dayOf(end)}, ${end.year}`
  }

  if (start.month === end.month) {
    return `${monthOf(start)} ${dayOf(start)}–${dayOf(end)}, ${start.year}`
  }

  return `${monthOf(start)} ${dayOf(start)} – ${monthOf(end)} ${dayOf(end)}, ${start.year}`
}

export const formatEventTime = (event) => {
  if (event?.time && event?.endTime) return `${event.time} – ${event.endTime}`
  return event?.time || ''
}
