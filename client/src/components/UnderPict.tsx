import * as React from 'react'
import styled from 'styled-components'
import styles from '../helpers/styles'

/*
 * isOpenがtrueだと上向き、falseだと下向きのShapeを返す
 */
const makeShape = (isOpen: boolean): JSX.Element => {
  if (isOpen) {
    return (
      <g>
        <line className="cls-1" x1={13} y1={2} x2="23.7" y2="12.7" />
        <line className="cls-1" x1="12.7" y1={2} x2={2} y2="12.7" />
      </g>
    )
  } else {
    return (
      <g>
        <line className="cls-1" x1="23.69" y1={2} x2={13} y2="12.69" />
        <line className="cls-1" x1={2} y1={2} x2="12.69" y2="12.69" />
      </g>
    )
  }
}

interface Props {
  isOpen: boolean
}

const UnderPict = ({ isOpen }: Props): JSX.Element => (
  <styles.SCs.Svg id="layer" viewBox="0 0 25.69 14.69">
    <defs>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '.cls-1{fill:none;stroke:#757575;stroke-linecap:round;stroke-miterlimit:10;stroke-width:4px;}'
        }}
      />
    </defs>
    <title>under</title>
    {makeShape(isOpen)}
  </styles.SCs.Svg>
)

export default UnderPict
