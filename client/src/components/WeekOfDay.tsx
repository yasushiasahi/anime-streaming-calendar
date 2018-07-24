import * as React from "react"
import styled from "styled-components"
import { log } from "util"
import styles from "../helpers/styles"
import Icon, { IN } from "./icon/Icon"
const schedules: Schedule[] = [
  { id: 1, name: "プラネット ウィズ", service: [IN.Netflix, IN.Amazon, IN.Danime] },
  { id: 2, name: "あそびあそばせ", service: [IN.Netflix, IN.Amazon, IN.Danime] },
  { id: 3, name: "邪神ちゃんドロップキック", service: [IN.Netflix, IN.Amazon, IN.Danime] },
  { id: 4, name: "オーバーロードⅢ", service: [IN.Netflix, IN.Amazon, IN.Danime] },
  { id: 5, name: "BANANA FISH", service: [IN.Netflix, IN.Amazon, IN.Danime] },
  { id: 6, name: "バキ", service: [IN.Netflix, IN.Amazon, IN.Danime] },
  { id: 7, name: "三星のスバル", service: [IN.Netflix, IN.Amazon, IN.Danime] },
  { id: 8, name: "異世界魔王と召喚少女の奴隷魔術", service: [IN.Netflix, IN.Amazon, IN.Danime] },
  { id: 9, name: "はねバド", service: [IN.Netflix, IN.Amazon, IN.Danime] },
  { id: 10, name: "ちおちゃんの通学路", service: [IN.Netflix, IN.Amazon, IN.Danime] },
]

interface Schedule {
  id: number
  name: string
  service: number[]
}

interface WODProps {
  dayNum: number
  dayStr: string
}

interface WProps {
  isToday: boolean
}

const getIsToday = (date: number): boolean => new Date().getDate() === date

const makeIcons = (ss: number[]): JSX.Element[] => ss.map((s) => <Icon key={s} i={s} />)

const makeScheduleBoxs = (ss: Schedule[]): JSX.Element[] =>
  ss.map((s) => (
    <ScheduleBox key={s.id}>
      <span>{s.name}</span>
      <div>{makeIcons(s.service)}</div>
    </ScheduleBox>
  ))

export default ({ dayStr, dayNum }: WODProps) => (
  <Wrapper isToday={getIsToday(dayNum)}>
    <DayWrapper>
      <div>{dayStr}</div>
      <div>{dayNum}</div>
    </DayWrapper>
    <Divider />
    <GridContainer>{makeScheduleBoxs(schedules)}</GridContainer>
  </Wrapper>
)

const Wrapper = styled.div<WProps>`
  ${styles.Props.Border("right")};
  background-color: ${(p) => (p.isToday ? styles.Colors.BGGray : "transparent")};
`

const DayWrapper = styled.div`
  height: 92px;
  padding-left: 16px;

  color: ${styles.Colors.FontLight};
  ${styles.Props.Border("bottom")};

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
  ${styles.Props.Border("right")};
`

const GridContainer = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: 10px;

  padding-right: 12px;
`

const ScheduleBox = styled.div`
  padding: 3px;
  cursor: pointer;
  overflow: hidden;
  background-color: rgb(243, 187, 207);
  border-radius: 2px;

  span {
    white-space: nowrap;
    font-size: 0.8rem;
    line-height: 1.5rem;
  }

  img {
    width: 1rem;
    margin-right: 5px;
  }
`
