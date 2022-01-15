import * as React from "react"
import { View, TouchableOpacity } from "react-native"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  const { width = 17.513, height = 14.259, fill = "#040606", style = {},onPress=false } = props
  return (
    <View style={style}>
      <TouchableOpacity activeOpacity={onPress?0.6:1}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 18.688 16.352"
          fill={fill}
        >
          <Path
            data-name="Path 2"
            d="M18.6 6.336h-5.2l-1.341-2.044A.52.52 0 0011.592 4h-5.84A1.721 1.721 0 004 5.752v4.555a6.174 6.174 0 012.336-.467 5.857 5.857 0 015.84 5.84 6.174 6.174 0 01-.467 2.336H18.6a1.721 1.721 0 001.752-1.752V8.088A1.721 1.721 0 0018.6 6.336zm.584 9.111L14.162 7.5H18.6a.552.552 0 01.584.584z"
            transform="translate(0 -4) translate(-1.664)"
          />
          <Path
            data-name="Path 3"
            d="M4.672 16a4.672 4.672 0 104.672 4.672A4.686 4.686 0 004.672 16zm2.161 5.139a.565.565 0 01-.818 0l-.759-.759v2.628a.552.552 0 01-.584.584.552.552 0 01-.584-.584V20.38l-.759.759a.578.578 0 01-.818-.818l1.752-1.81a.565.565 0 01.818 0l1.752 1.81a.565.565 0 010 .818z"
            transform="translate(0 -4) translate(0 -4.992)"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  )
}

export default SvgComponent
