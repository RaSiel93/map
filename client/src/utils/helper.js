export const safeParseJson = (value, defaultValue) => {
  try {
    return  JSON.parse(value)
  } catch (e) {
    return defaultValue
  }
}

export const compareTags = (key, value) => ([key2, value2]) => {
  return key === key2 && value === value2
}
