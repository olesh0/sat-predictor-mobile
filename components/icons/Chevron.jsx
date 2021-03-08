import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const Chevron = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="10.778"
    height="5.889"
    viewBox="0 0 10.778 5.889"
    {...props}
  >
    <Path
      d="M18.364,18.182,13.682,13.5,9,18.182"
      transform="translate(19.071 18.889) rotate(180)"
      fill="none"
      stroke="#5f6d77"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
    />
  </Svg>
)
