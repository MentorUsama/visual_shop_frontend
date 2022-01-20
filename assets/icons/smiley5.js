import * as React from "react"
import { TouchableOpacity } from "react-native"
import Svg, { G, Path } from "react-native-svg"

const SvgComponent = (props) => {
  const { width = 55.926, height = 55.926, fill = "rgba(46,45,45,0.4)", style = {}, onPress = null } = props
  return (
    <TouchableOpacity activeOpacity={onPress ? 0.8 : 1} onPress={onPress}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
      >
        <G data-name="Group 191" fill={fill}>
          <Path d="M43.392 43.398a23.787 23.787 0 0 1-16.929 7.013 23.789 23.789 0 0 1-16.93-7.013A23.787 23.787 0 0 1 2.52 26.467 23.783 23.783 0 0 1 9.533 9.538a23.783 23.783 0 0 1 16.93-7.013 23.781 23.781 0 0 1 16.929 7.013 23.781 23.781 0 0 1 7.013 16.929 23.785 23.785 0 0 1-7.013 16.931Zm1.783-35.643A26.29 26.29 0 0 0 26.463.004 26.29 26.29 0 0 0 7.751 7.755 26.292 26.292 0 0 0 0 26.467a26.29 26.29 0 0 0 7.751 18.712 26.29 26.29 0 0 0 18.712 7.751 26.29 26.29 0 0 0 18.712-7.751 26.29 26.29 0 0 0 7.751-18.712 26.292 26.292 0 0 0-7.751-18.712" />
          <Path d="M26.446 38.913a12.1 12.1 0 0 1-10.19-5.568l20.422-.066a12.082 12.082 0 0 1-10.232 5.634Zm12.311-8.16-24.587.077a1.262 1.262 0 0 0-1.05.569 1.262 1.262 0 0 0-.1 1.19 14.615 14.615 0 0 0 13.435 8.844 14.6 14.6 0 0 0 13.471-8.93 1.261 1.261 0 0 0-.111-1.189 1.258 1.258 0 0 0-1.049-.561M17.944 22.027a3.025 3.025 0 0 0 3.024-3.025 3.025 3.025 0 0 0-3.024-3.025 3.025 3.025 0 0 0-3.024 3.025 3.025 3.025 0 0 0 3.024 3.025M34.982 22.027a3.025 3.025 0 0 0 3.025-3.025 3.025 3.025 0 0 0-3.025-3.025 3.025 3.025 0 0 0-3.025 3.025 3.025 3.025 0 0 0 3.025 3.025" />
        </G>
      </Svg>
    </TouchableOpacity>
  )
}

export default SvgComponent