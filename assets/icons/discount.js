import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

const SvgComponent = (props) => {
  const { width = 21.215, height = 21.215, fill = "#040606" } = props
  return(
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    {...props}
  >
    <G data-name="-Round-/-Maps-/-ocal_offer">
      <G data-name="Group 128">
        <Path d="M0 0h21.215v21.215H0Z" fill="none" />
        <Path
          data-name="\uD83D\uDD39-Icon-Color"
          d="m18.926 10.236-7.958-7.955a1.757 1.757 0 0 0-1.244-.513H3.536a1.773 1.773 0 0 0-1.768 1.768v6.188a1.764 1.764 0 0 0 .522 1.255l7.956 7.956a1.757 1.757 0 0 0 1.246.513 1.728 1.728 0 0 0 1.246-.522l6.188-6.188a1.728 1.728 0 0 0 .522-1.246 1.785 1.785 0 0 0-.522-1.256ZM4.862 6.188a1.326 1.326 0 1 1 1.326-1.326 1.324 1.324 0 0 1-1.326 1.326Z"
          fill={fill}
          fillRule="evenodd"
        />
      </G>
    </G>
  </Svg>
)}

export default SvgComponent
