import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={13.609}
      height={14}
      viewBox="0 0 13.609 14"
      {...props}
    >
      <Path
        d="M11.319-398.536V-400H8.92v1.463H4.689V-400H2.29v1.463H0V-386h13.609v-12.537zm-1.684-.747h.965v2.626h-.964zm-6.631 0h.968v2.626H3zm9.889 12.569H.715v-8.757h12.179zm-9.345-2.641H1.82v1.73h1.73zm2.747 0H4.566v1.73H6.3zm2.747 0H7.313v1.73h1.73zm2.747 0H10.06v1.73h1.73zm-8.24-2.609H1.82v1.73h1.73zm2.747 0h-1.73v1.73H6.3zm2.747 0h-1.73v1.73h1.73zm2.747 0h-1.73v1.73h1.73zm-5.49-2.611H4.566v1.73H6.3zm2.747 0H7.313v1.73h1.73zm2.747 0H10.06v1.73h1.73v-1.73"
        transform="translate(0 399.999)"
        fill="#100f0d"
      />
    </Svg>
  )
}

export default SvgComponent
