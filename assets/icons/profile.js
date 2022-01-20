import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function SvgComponent(props) {
  const { width = 51.956, height = 51.956, fill = "#040606" } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
    >
      <G data-name="Group 280">
        <Path
          data-name="Path 17"
          d="M25.978 0a25.978 25.978 0 1 0 25.978 25.978A25.979 25.979 0 0 0 25.978 0Zm0 7.767a8.594 8.594 0 1 1-8.594 8.594 8.6 8.6 0 0 1 8.594-8.594Zm-.005 37.4a19.077 19.077 0 0 1-12.416-4.575 3.651 3.651 0 0 1-1.283-2.783 8.666 8.666 0 0 1 8.711-8.663h10a8.652 8.652 0 0 1 8.695 8.663 3.651 3.651 0 0 1-1.283 2.783 19.13 19.13 0 0 1-12.424 4.573Z"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
