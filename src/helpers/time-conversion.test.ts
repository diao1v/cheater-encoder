import {
  convertSecToTimespan,
  getUnixTime,
  getCurrentTime,
} from './time-conversion'
import dayjs from 'dayjs'

// write jest test cases for these method

describe('time-conversion', () => {
  // convertSecToTimespan
  describe('convertSecToTimespan', () => {
    test('should return 0H0M0.00000S when sec is 0', () => {
      expect(convertSecToTimespan(0)).toBe('0H0M0.00000S')
    })
    test('should return 0H0M1.00000S when sec is 1', () => {
      expect(convertSecToTimespan(1)).toBe('0H0M1.00000S')
    })
    test('should return 0H1M1.00000S when sec is 61', () => {
      expect(convertSecToTimespan(61)).toBe('0H1M1.00000S')
    })
    test('should return 1H1M1.00000S when sec is 3661', () => {
      expect(convertSecToTimespan(3661)).toBe('1H1M1.00000S')
    })
  })

  // getUnixTime
  describe('getUnixTime', () => {
    test('should return 0 when time is 1970-01-01T00:00:00.000Z', () => {
      expect(getUnixTime('1970-01-01T00:00:00.000Z')).toBe(0)
    })
    test('should return 1 when time is 1970-01-01T00:00:01.000Z', () => {
      expect(getUnixTime('1970-01-01T00:00:01.000Z')).toBe(1)
    })
    test('should return 60 when time is 1970-01-01T00:01:00.000Z', () => {
      expect(getUnixTime('1970-01-01T00:01:00.000Z')).toBe(60)
    })
    test('should return 3600 when time is 1970-01-01T01:00:00.000Z', () => {
      expect(getUnixTime('1970-01-01T01:00:00.000Z')).toBe(3600)
    })
    test('should return 86400 when time is 1970-01-02T00:00:00.000Z', () => {
      expect(getUnixTime('1970-01-02T00:00:00.000Z')).toBe(86400)
    })
  })

  // getCurrentTime
  describe('getCurrentTime', () => {
    test('returns the current time in ISO format', () => {
      const currentTime = getCurrentTime()
      expect(dayjs(currentTime).isValid()).toBe(true)
      expect(currentTime).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
      )
    })

    test('returns a new date string on each call', async () => {
      const time1 = getCurrentTime()
      await new Promise((resolve) => setTimeout(resolve, 10))
      const time2 = getCurrentTime()
      expect(time1).not.toBe(time2)
    })
  })
})
