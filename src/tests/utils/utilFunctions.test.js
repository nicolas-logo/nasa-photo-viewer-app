import { isDateVerifier } from '../../utils/utilFunctions'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})

describe('Util tests', () => {
  it('should return true if the string is not a date', () => {
    const result = isDateVerifier('2010-01-01')
    expect(result).toBe(true)
  })

  it('should return false if the string is not a date', () => {
    const result = isDateVerifier('1000')
    expect(result).toBe(false)
  })
})
