import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  const {width=23.588,height=18.155}=props;
  return (
    <Svg
      data-name="Group 139"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 23.588 18.155"
      {...props}
    >
      <Path
        d="M688.975-261.565l8.2 9.3a2.454 2.454 0 001.842.832 2.456 2.456 0 001.841-.832l8.054-9.138a.855.855 0 01.229-.181 2.762 2.762 0 00-1.114-.234H690a2.773 2.773 0 00-1.069.214c.013.013.029.025.042.039"
        transform="translate(-687.218 261.818)"
        fill={props.fill}
      />
      <Path
        d="M708.664-259.207a.855.855 0 01-.158.265l-8.054 9.138a4.205 4.205 0 01-3.153 1.425 4.2 4.2 0 01-3.154-1.425l-8.2-9.3a.7.7 0 01-.043-.06 2.766 2.766 0 00-.4 1.435v12.587a2.784 2.784 0 002.784 2.784h18.021a2.784 2.784 0 002.783-2.784v-12.587a2.764 2.764 0 00-.428-1.479"
        transform="translate(-685.504 260.513)"
        fill={props.fill}
      />
    </Svg>
  )
}

export default SvgComponent
