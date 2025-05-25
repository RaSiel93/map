export const safeParseJson = (value) => {
  try {
    return JSON.parse(value)
  } catch (e) {
  }
}

export const compareTags = (key, value) => ([key2, value2]) => {
  return key === key2 && value === value2
}

export const formatInputDate = (date) => (date && (new Date(date)).toLocaleDateString('en-CA'))

export const formatInputYear = (year) => (year && (new Date(year)).getFullYear())

export const formatInputDatetime = (datetime) => (datetime?.replace(/\..+/, ''))
