import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M6.442 23.213h10.331a3.491 3.491 0 0 0 3.414-2.8l1.645-8.23H1.382l1.645 8.23a3.491 3.491 0 0 0 3.414 2.8Zm7.487-7.547a.58.58 0 1 1 1.161 0v3.483a.58.58 0 0 1-1.161 0Zm-2.9 0a.58.58 0 1 1 1.161 0v3.483a.58.58 0 1 1-1.161 0Zm-2.9 0a.58.58 0 0 1 1.161 0v3.483a.58.58 0 0 1-1.161 0Zm13.053-8.708h-1.79L13.02.585a2 2 0 0 0-2.827 0L3.82 6.958H2.032a2.032 2.032 0 1 0 0 4.064h19.15a2.032 2.032 0 1 0 0-4.064Zm-15.718 0 5.55-5.553a.84.84 0 0 1 1.186 0l5.55 5.552Z" />
  </Svg>
)

export default SvgComponent
