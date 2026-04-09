export const clampDate = (dateStr) => {
  if (!dateStr) return null
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return null
  return d
}

export const diffDays = (pickupDate, returnDate) => {
  const p = new Date(pickupDate)
  const r = new Date(returnDate)
  const ms = r.getTime() - p.getTime()
  const days = Math.round(ms / (1000 * 60 * 60 * 24))
  return Math.max(1, days)
}

export const toISODateInput = (d) => {
  if (!d) return ''
  const date = new Date(d)
  const y = date.getFullYear()
  const m = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${y}-${m}-${day}`
}

