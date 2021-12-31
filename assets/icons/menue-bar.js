import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 283.426 283.426"
      xmlSpace="preserve"
      enableBackground="new 0 0 283.426 283.426"
      {...props}
    >
      <Path d="M0 40.84H283.426V88.575H0z" fill="#010002" />
      <Path d="M0 117.282H283.426V165.017H0z" fill="#010002" />
      <Path d="M0 194.851H283.426V242.586H0z" fill="#010002" />
    </Svg>
  )
}

export default SvgComponent
