import * as React from "react"
import { TouchableOpacity } from "react-native"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => {
  const { width = 26.5, height = 24.382, fill = "#040606", style = {}, onPress = false } = props
  return (
    <TouchableOpacity activeOpacity={onPress ? 0.8 : 1} onPress={onPress?onPress:null}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
      >
        <Path
          data-name="05258e0c-c8f4-4ed7-8036-91cb9fac21c8"
          d="M22.261 22.26a2.122 2.122 0 1 1-2.122-2.122 2.122 2.122 0 0 1 2.122 2.122Zm-10.6-2.122a2.122 2.122 0 1 0 2.122 2.122 2.122 2.122 0 0 0-2.122-2.122Zm-4.219-2.972a1.06 1.06 0 0 0 .052.18c.01.027.025.052.038.077s.026.06.043.087.037.052.056.077a.824.824 0 0 0 .052.069l.058.057c.019.019.045.047.07.068s.037.025.055.038a1.065 1.065 0 0 0 .093.063c.018.01.037.017.055.025a1.055 1.055 0 0 0 .108.052c.03.01.061.017.091.024s.055.017.083.022a1.051 1.051 0 0 0 .184.016h14.84a1.06 1.06 0 0 0 1.039-.852l.89-4.448H6.552ZM26.26 5.686a1.059 1.059 0 0 0-.82-.388H7.23L6.34.852A1.06 1.06 0 0 0 5.301 0h-4.24a1.061 1.061 0 1 0 0 2.122h3.371l1.7 8.48h19.54l.806-4.032a1.059 1.059 0 0 0-.218-.882Z"
          fill={fill}
        />
      </Svg>
    </TouchableOpacity>
  )
}
export default SvgComponent