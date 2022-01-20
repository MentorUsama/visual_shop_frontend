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
        <G data-name="Group 188" fill={fill}>
          <Path d="M43.396 43.396a23.785 23.785 0 0 1-16.931 7.013 23.785 23.785 0 0 1-16.931-7.013 23.786 23.786 0 0 1-7.013-16.931A23.785 23.785 0 0 1 9.534 9.534a23.785 23.785 0 0 1 16.931-7.013 23.785 23.785 0 0 1 16.931 7.013 23.785 23.785 0 0 1 7.013 16.931 23.786 23.786 0 0 1-7.013 16.931Zm1.782-35.644A26.291 26.291 0 0 0 26.464.001 26.291 26.291 0 0 0 7.751 7.752 26.291 26.291 0 0 0-.001 26.466 26.291 26.291 0 0 0 7.751 45.18a26.291 26.291 0 0 0 18.713 7.751 26.291 26.291 0 0 0 18.714-7.751 26.291 26.291 0 0 0 7.751-18.714 26.29 26.29 0 0 0-7.751-18.714" />
          <Path d="M17.872 21.765a2.824 2.824 0 0 0 2.823-2.824 2.824 2.824 0 0 0-2.823-2.824 2.824 2.824 0 0 0-2.823 2.824 2.824 2.824 0 0 0 2.823 2.824M35.057 21.765a2.824 2.824 0 0 0 2.823-2.824 2.824 2.824 0 0 0-2.823-2.824 2.824 2.824 0 0 0-2.824 2.824 2.824 2.824 0 0 0 2.824 2.824M36.481 31.827 16.917 37.88a1.176 1.176 0 0 0-.776 1.472 1.177 1.177 0 0 0 1.124.829 1.161 1.161 0 0 0 .348-.054l19.564-6.053a1.177 1.177 0 0 0 .776-1.472 1.176 1.176 0 0 0-1.472-.775" />
        </G>
      </Svg>
    </TouchableOpacity>
  )
}

export default SvgComponent