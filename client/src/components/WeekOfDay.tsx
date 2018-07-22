import * as React from 'react'
import styled from 'styled-components'
import styles from '../helpers/styles'
import { log } from 'util'

const getIsToday = (date: number): boolean => new Date().getDate() === date

interface Props {
  dayNum: number
  dayStr: string
}

interface Schedule {
  id: number
  name: string
}

const schedules: Schedule[] = [
  { id: 1, name: 'プラネット ウィズ' },
  { id: 2, name: 'あそびあそばせ' },
  { id: 3, name: '邪神ちゃんドロップキック' },
  { id: 4, name: 'オーバーロードⅢ' },
  { id: 5, name: 'BANANA FISH' },
  { id: 6, name: 'バキ' },
  { id: 7, name: '三星のスバル' },
  { id: 8, name: '異世界魔王と召喚少女の奴隷魔術' },
  { id: 9, name: 'はねバド' },
  { id: 10, name: 'ちおちゃんの通学路' }
]

const makeScheduleBoxs = (ss: Schedule[]): JSX.Element[] => {
  return ss.map(s => (
    <ScheduleBox key={s.id}>
      <span>{s.name}</span>
    </ScheduleBox>
  ))
}

class WeekOfDay extends React.Component<Props, {}> {
  render() {
    const { dayStr, dayNum } = this.props
    return (
      <Wrapper isToday={getIsToday(dayNum)}>
        <DayWrapper>
          <div>{dayStr}</div>
          <div>{dayNum}</div>
        </DayWrapper>
        <Divider />
        <GridContainer>{makeScheduleBoxs(schedules)}</GridContainer>
      </Wrapper>
    )
  }
}

interface WProps {
  isToday: boolean
}

const Wrapper = styled.div<WProps>`
  ${styles.Props.Border('right')};
  background-color: ${p => (p.isToday ? styles.Colors.BGGray : 'transparent')};
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

const Divider = styled.div`
  height: 5px;
  ${styles.Props.Border('right')};
`

const GridContainer = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: 10px;

  padding-right: 12px;
`

const ScheduleBox = styled.div`
  padding: 3px;

  background-color: rgb(243, 187, 207);
  cursor: pointer;

  overflow: hidden;

  span {
    white-space: nowrap;
    font-size: 0.7rem;
  }
`

export default WeekOfDay
