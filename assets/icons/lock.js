import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16.499}
      height={22.5}
      viewBox="0 0 16.499 22.5"
      {...props}
    >
      <Path
        data-name="5402395_encryption_lock_password_security_key_icon"
        d="M18.826 10.654V6.615A4.863 4.863 0 0013.749 2a4.863 4.863 0 00-5.076 4.615v4.038A3.039 3.039 0 005.5 13.538v8.077A3.039 3.039 0 008.673 24.5h10.153A3.039 3.039 0 0022 21.615v-8.077a3.039 3.039 0 00-3.174-2.884zm-3.807 8.331v.323a1.275 1.275 0 01-2.538 0v-.323A2.28 2.28 0 0111.211 17a2.431 2.431 0 012.538-2.308A2.431 2.431 0 0116.288 17a2.28 2.28 0 01-1.269 1.985zm1.269-8.331h-5.077V6.615a2.431 2.431 0 012.538-2.308 2.431 2.431 0 012.538 2.308z"
        transform="translate(-5.5 -2)"
        fill={props.fill}
      />
    </Svg>
  )
}

export default SvgComponent
