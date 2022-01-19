import * as React from "react"
import { View, TouchableOpacity } from "react-native"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  const { width = 17.513, height = 14.259, fill = "#040606", style = {},onPress=false } = props
  return (
    <View style={style}>
      <TouchableOpacity activeOpacity={onPress?0.6:1} onPress={onPress}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 17.513 14.259"
          fill={fill}
        >
          <Path
            data-name="Path 1"
            d="M11.581 11.671a2.824 2.824 0 11-2.825-2.824 2.828 2.828 0 012.825 2.824zm5.932-4.011v8.022a1.937 1.937 0 01-1.937 1.937H1.937A1.937 1.937 0 010 15.683V7.661a1.937 1.937 0 011.937-1.937h2.381v-.67A1.694 1.694 0 016.013 3.36H11.5a1.694 1.694 0 011.694 1.694v.67h2.382a1.937 1.937 0 011.937 1.937zm-4.48 4.011a4.277 4.277 0 10-4.277 4.277 4.282 4.282 0 004.277-4.277z"
            transform="translate(0 -3.36)"
          />
        </Svg>
      </TouchableOpacity>
    </View>

  )
}

export default SvgComponent
