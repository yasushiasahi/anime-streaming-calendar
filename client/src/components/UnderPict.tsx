import * as React from 'react'
import styled from 'styled-components'

const UnderPict = () => (
  <Svg id="layer" viewBox="0 0 25.69 14.69">
    <defs>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '.cls-1{fill:none;stroke:#757575;stroke-linecap:round;stroke-miterlimit:10;stroke-width:4px;}'
        }}
      />
    </defs>
    <title>under</title>
    <line className="cls-1" x1="23.69" y1={2} x2={13} y2="12.69" />
    <line className="cls-1" x1={2} y1={2} x2="12.69" y2="12.69" />
  </Svg>
)

const Svg = styled.svg`
  height: 100%;
`
export default UnderPict
