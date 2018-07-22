import * as React from 'react'
import styled from 'styled-components'
import WeekOfDay from './WeekOfDay'
import styles from '../helpers/styles'
import { log } from 'util'

const getMonthLength = (month: number): number => {
  if (month === 2) {
    const year = new Date().getFullYear()
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28
  }
  return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]
}

const getWeek = (): number[] => {
  const now = new Date()
  const month = now.getMonth() + 1
  const today = now.getDate()
  const day = now.getDay()
  let week = [today]
  let idx: number

  if (day === 0) {
    for (let i = 1; i < 7; i++) {
      week.unshift(today - i)
    }
  } else {
    for (let i = 1; i < day; i++) {
      week.unshift(today - i)
    }
    for (let i = 1; i < 8 - day; i++) {
      week.push(today + i)
    }
  }

  idx = week.findIndex(n => n === 0)
  if (idx !== -1) {
    let newWeek: number[]
    for (let i = 0; i < idx + 1; i++) {
      newWeek.push(getMonthLength(month - 1) - i)
    }
    week = newWeek.reverse().concat(week.slice(-6 + idx))
    return week
  }

  idx = week.findIndex(n => n === getMonthLength(month))
  if (idx !== -1 && idx !== 6) {
    let newWeek: number[]
    for (let i = 1; i < 7 - idx; i++) {
      newWeek.push(i)
    }
    week = week.slice(0, idx + 1).concat(newWeek)
    return week
  }

  return week
}

const weekOfDays = getWeek().map((d, i) => (
  <WeekOfDay key={d} dayNum={d} dayStr={['月', '火', '水', '木', '金', '土', '日'][i]} />
))

const Calendar = (): JSX.Element => (
  <GridContainer>
    <Divider />
    {weekOfDays}
  </GridContainer>
)

const GridContainer = styled.div`
  grid-area: Calendar;
  display: grid;
  grid-template-columns: 5px repeat(7, 1fr);
`

const Divider = styled.div`
  ${styles.Props.Border('right')};
`

export default Calendar
