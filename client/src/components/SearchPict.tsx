import * as React from 'react'
import styled from 'styled-components'

const SearchPict = () => (
  <Svg id="layer" viewBox="0 0 40.81 42">
    <defs>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n      .cls-1{fill:none;stroke:#757575;stroke-linecap:round;stroke-miterlimit:10;stroke-width:4px;}\n    '
        }}
      />
    </defs>
    <title>search</title>
    <circle className="cls-1" cx="16.84" cy="16.84" r="14.84" />
    <line className="cls-1" x1="28.13" y1="29.31" x2="38.81" y2={40} />
  </Svg>
)

const Svg = styled.svg`
  height: 100%;
`
export default SearchPict
