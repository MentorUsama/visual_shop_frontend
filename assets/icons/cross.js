import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

const SvgComponent = (props) => {
  const { width = 20.414, height = 20.414,strokeWidth=2, fill = "#040606", style = {}, onPress = false } = props
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
  >
    <G data-name="Group 12">
      <G
        data-name={5534738001581069000}
        fill={fill}
        stroke={fill}
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      >
        <Path data-name="Line 3" d="m.707.707 9 9" />
        <Path data-name="Line 4" d="m.707 9.707 9-9" />
      </G>
    </G>
  </Svg>
)}

export default SvgComponent
