export const isDateVerifier = (testString) => {
  // Regular expression to match a date in YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/

  if (dateRegex.test(testString)) {
    return true
  } else {
    return false
  }
}
