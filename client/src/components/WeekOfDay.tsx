import * as React from 'react'
import styled from 'styled-components'
import styles from '../helpers/styles'
import { log } from 'util'

interface Props {
  dayNum: number
  dayStr: string
}

class WeekOfDay extends React.Component<Props, {}> {
  render() {
    const { dayStr, dayNum } = this.props
    return (
      <GridContainer>
        <DayWrapper>
          <div>{dayStr}</div>
          <div>{dayNum}</div>
        </DayWrapper>
      </GridContainer>
    )
  }
}

const GridContainer = styled.div`
  display: grid;
  ${styles.Props.Border('right')};
`

const DayWrapper = styled.div`
  height: 92px;
  padding-left: 16px;

  color: ${styles.Colors.FontLight};
  ${styles.Props.Border('bottom')};

  div:nth-of-type(1) {
    font-size: 0.8rem;
    line-height: 2rem;
  }
  div:nth-of-type(2) {
    font-size: 2.5rem;
    line-height: 2rem;
  }
`

export default WeekOfDay
