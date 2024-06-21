export const safeParseJson = (value) => {
  try {
    return JSON.parse(value)
  } catch (e) {
  }
}

export const compareTags = (key, value) => ([key2, value2]) => {
  return key === key2 && value === value2
}
