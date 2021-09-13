export const useRange = ({ start, end }) => {
  const range = []

  for (let i = start; i < end; i += 1) {
    range.push(i)
  }

  return range
}
