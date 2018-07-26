import * as React from "react"
import styled from "styled-components"
import { log } from "util"
import styles from "../util/style"
import WeekOfDay from "./WeekOfDay"

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
  /*
   * today当日とday(0~7)曜日を基準にlength 7の配列を作る
   */
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
  /*
   * 配列に0が含まれている(前月と今月をまたいでいる)場合
   */
  idx = week.findIndex((n) => n === 0)
  if (idx !== -1) {
    const newWeek: number[] = []
    for (let i = 0; i < idx + 1; i++) {
      newWeek.push(getMonthLength(month - 1) - i)
    }
    week = newWeek.reverse().concat(week.slice(-6 + idx))
    return week
  }
  /*
   * 配列に当月の日数+1が含まれている(今月と来月をまたいでいる)場合
   */
  idx = week.findIndex((n) => n === getMonthLength(month) + 1)
  if (idx !== -1) {
    const newWeek: number[] = []
    for (let i = 1; i < 8 - idx; i++) {
      newWeek.push(i)
    }
    console.log(newWeek)
    week = week.slice(0, idx).concat(newWeek)
    return week
  }
  return week
}

const weekOfDays = getWeek().map((d, i) => (
  <WeekOfDay key={d} dayNum={d} dayStr={["月", "火", "水", "木", "金", "土", "日"][i]} />
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
  ${styles.Props.Border("right")};
`

export default Calendar
