import * as React from "react"
import styled from "styled-components"
import { C } from "./App"
import { log } from "util"
import style from "../util/style"
import { Schedule, Work } from "../util/type/type"
import Logo from "./icon/Logo"

interface WODProps {
  dayNum: number
  dayStr: string
  sds: Schedule[]
}

interface WProps {
  isToday: boolean
}

const getIsToday = (date: number): boolean => new Date().getDate() === date

interface Datas {
  [key: number]: number[]
}

const makeSceduleBoxs = (sds: Schedule[], wks: Work[]): JSX.Element[] => {
  let datas: Datas = {}
  let boxs: JSX.Element[] = []

  for (const sd of sds) {
    datas[sd.workId] = []
  }
  for (const sd of sds) {
    datas[sd.workId].push(sd.serviceId)
  }

  for (const key in datas) {
    const wk = wks.find((wk) => wk.id === parseInt(key))
    const icons = datas[key].map((sdId) => <Logo key={sdId} i={sdId} />)
    boxs.push(
      <ScheduleBox key={key}>
        <span>{wk.name}</span>
        <div>{icons}</div>
      </ScheduleBox>
    )
  }
  return boxs
}

export default ({ dayStr, dayNum, sds }: WODProps) => {
  return (
    <C>
      {({ wks }) => (
        <Wrapper isToday={getIsToday(dayNum)}>
          <DayWrapper>
            <div>{dayStr}</div>
            <div>{dayNum}</div>
          </DayWrapper>
          <Divider />
          <GridContainer>{makeSceduleBoxs(sds, wks)}</GridContainer>
        </Wrapper>
      )}
    </C>
  )
}

const Wrapper = styled.div<WProps>`
  ${style.Props.Border("right")};
  background-color: ${(p) => (p.isToday ? style.Color.BGGray : "transparent")};
`

const DayWrapper = styled.div`
  height: 92px;
  padding-left: 16px;

  color: ${style.Color.FontLight};
  ${style.Props.Border("bottom")};

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
  ${style.Props.Border("right")};
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
