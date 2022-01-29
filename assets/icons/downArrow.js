import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
function SvgComponent(props) {
  const {width=12.041,height=7.247,fill='#828181',direction="down"}=props
  var transformation=""
  direction=="down"?"rotate(1 .061 7.047)":transformation="translate(12.041 7.039) rotate(179)"
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 12.041 7.247"
    >
      <G data-name="Group 55">
        <Path
          data-name="Path 6"
          d="M11.729.588L11.339.2a.654.654 0 00-.922 0L5.963 4.649 1.5.19a.654.654 0 00-.922 0L.191.581a.653.653 0 000 .922L5.5 6.831a.666.666 0 00.462.209.666.666 0 00.461-.209l5.3-5.314a.659.659 0 00.191-.466.652.652 0 00-.185-.463z"
          fill={fill}
          transform={transformation}
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
