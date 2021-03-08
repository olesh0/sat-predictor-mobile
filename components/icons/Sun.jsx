import React from 'react'
import Svg, { G, Circle } from 'react-native-svg'

export default (props) => (
	<Svg
		version="1.1"
		id="Capa_1"
		x="0px"
		y="0px"
		viewBox="0 0 111.69 111.69"
		style={{ enableBackground: "new 0 0 111.69 111.69" }}
		space="preserve"
		{...props}
	>
		<G id="sun">
			<Circle style={{ fill: "#FCDD66" }} cx={55.845} cy={55.845} r={55.845}/>
			<Circle style={{ fill: "#FBD009" }} cx={55.845} cy={55.845} r={46.174} />
		</G>
	</Svg>
)
