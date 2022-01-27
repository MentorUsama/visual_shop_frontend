import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { TouchableOpacity, View } from "react-native"

const SvgComponent = (props) => {
  const { width = 10, height = 10, fill = "#040606", style = {}, onPress = null } = props
  return (
    <TouchableOpacity activeOpacity={onPress ? 0.8 : 1} onPress={onPress}>
      <View style={style}>
        <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
          <Path
            data-name="Path 8"
            d="M4.91 0 1.254 3.761l2.09 1.985L7 2.09ZM0 7l2.716-.627-1.985-1.88Z"
            fill={fill}
            fillRule="evenodd"
          />
        </Svg>
      </View>
    </TouchableOpacity>
  )
}

export default SvgComponent
