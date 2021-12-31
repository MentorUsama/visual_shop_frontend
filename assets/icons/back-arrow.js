import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G data-name="Group 55" >
      <Path
        data-name="Path 6"
        d="m9.463 16.205.524-.557a.9.9 0 0 0-.044-1.272L3.585 8.448 9.52 2.083A.9.9 0 0 0 9.475.809L8.92.29a.9.9 0 0 0-1.273.044L.553 7.915a.92.92 0 0 0-.267.647.92.92 0 0 0 .311.626l7.584 7.06a.909.909 0 0 0 .652.24.9.9 0 0 0 .63-.283Z"
      />
    </G>
  </Svg>
)

export default SvgComponent
