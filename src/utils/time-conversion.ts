import dayjs from 'dayjs'

export const getCurrentTime = () => {
  return dayjs().toDate().toISOString()
}

export const getUnixTime = (time: string) => {
  return dayjs(time).unix()
}

export const convertSecToTimespan = (sec: number) => {
  const hours = Math.floor(sec / 3600)
  const minutes = Math.floor((sec % 3600) / 60)
  const seconds = (sec % 60).toFixed(5)

  return `${hours}H${minutes}M${seconds}S`
}
