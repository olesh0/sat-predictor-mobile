import { useEffect, useState } from "react"

export const useYearsRange = ({ start, end }) => {
  const [years, setYears] = useState([])

  useEffect(() => {
    const yearsList = []

    for (let year = start; year < end; year += 1) {
      yearsList.push(year)
    }

    setYears(yearsList)
  }, [start, end])

  return { years }
}
