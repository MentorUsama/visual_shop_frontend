import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { View} from 'react-native';

function SvgComponent(props) {
  const { fill = "#909090", width = 15.477, height = 15.007,style={} } = props
  return (
    <View style={[{marginRight:2},style]}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 15.477 15.007"
      >
        <Path
          data-name="Path 7"
          d="M14.566 19.286l-4.245-.063-1.69-4.35a.964.964 0 00-1.787 0l-1.69 4.35-4.245.063A.964.964 0 00.356 21L3.8 23.98l-1.175 4.075a.964.964 0 001.423 1.084l3.69-2.019 3.69 2.017a.964.964 0 001.423-1.084l-1.173-4.075 3.442-2.984a.963.963 0 00-.554-1.708z"
          transform="translate(0 -14.271)"
          fill={fill}
        />
      </Svg>
    </View>
  )
}

export default SvgComponent