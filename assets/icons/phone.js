import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  const {width=13.81,height=20.715,fill="#040606"}=props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 13.81 20.715"
    >
      <Path
        d="M17.81 19.525l-3.039-5.865c-.007 0-1.7.837-1.781.873-1.933.937-5.868-6.75-3.978-7.763l1.8-.886L7.794 0 5.977.9C-.24 4.138 9.63 23.322 15.989 20.416c.1-.047 1.814-.888 1.821-.892z"
        transform="translate(-4)"
        fill={fill}
      />
    </Svg>
  )
}

export default SvgComponent
