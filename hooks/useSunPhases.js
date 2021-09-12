import moment from 'moment'
import { useEffect, useState } from 'react'
import { useSunData, useRange } from '.'

const getCurrentYear = () => new Date().getFullYear()

export const useSunPhases = ({
  location,
  year = getCurrentYear(),
}) => {
  const [data, setData] = useState({ year, data: [] })

  useEffect(() => {
    const sunPhases = moment.months().map((monthName, monthIndex) => {
      const sunData = useSunData({
        time: new Date(year, monthIndex),
        ...location,
      })

      return { monthName, sunData }
    })

    setData({
      year,
      data: sunPhases,
    })
  }, [year, location])

  return data
}

export const useMonthSunPhases = ({
  location,
  year,
  month,
}) => {
  const monthName = moment.months(month)
  const date = new Date(year, month)
  const [monthData, setMonthData] = useState([])

  useEffect(() => {
    const daysCount = moment(date).daysInMonth()
    const daysRange = useRange({ start: 0, end: daysCount })

    const daysData = daysRange.map((_, dayIndex) => useSunData({
        time: new Date(year, month, dayIndex),
        ...location,
      }))

    setMonthData(daysData)
  }, [year, month])

  return {
    date,
    monthName,
    monthData,
  }
}
