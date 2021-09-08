import moment from 'moment'
import { useEffect, useState } from 'react'
import { useSunData } from '.'

const getCurrentYear = () => new Date().getFullYear()

export const useSunPhases = ({
  location,
  year = getCurrentYear()
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
