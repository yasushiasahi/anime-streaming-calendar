import * as React from 'react'
import styled from 'styled-components'

const HamburgerPict = () => (
  <Svg viewBox="0 0 56 46">
    <defs>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:6px;}'
        }}
      />
    </defs>
    <title>hamburger</title>
    <line className="cls-1" x1={3} y1={43} x2={53} y2={43} />
    <line className="cls-1" x1={3} y1={23} x2={53} y2={23} />
    <line className="cls-1" x1={3} y1={3} x2={53} y2={3} />
  </Svg>
)

const Svg = styled.svg`
  height: 100%;
`

export default HamburgerPict
