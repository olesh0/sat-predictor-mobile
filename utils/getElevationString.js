export const getElevationString = (elevationDegress) => {
  if (elevationDegress < 30) return 'low'
  else if (elevationDegress >= 30 && elevationDegress < 60) return 'mid'
  else return 'high'
}
