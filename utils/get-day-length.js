import moment from 'moment'
import { shortEnglishHumanizer } from '.'

export const getDayLength = ({ sunrise, sunset }) => {
  const diff = moment(sunset).diff(sunrise)

  return {
    raw: diff,
    formatted: shortEnglishHumanizer(diff),
  }
}
