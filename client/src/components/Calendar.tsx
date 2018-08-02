import * as React from "react"
import styled from "styled-components"
import { log } from "util"
import style from "../util/style"
import { Schedule } from "../util/type/type"
import { getWeek } from "./helper"
import WeekOfDay from "./WeekOfDay"

interface CProps {
  sds: Schedule[]
}

export default ({ sds }: CProps): JSX.Element => {
  let sdsByWeek: Schedule[][] = [[], [], [], [], [], [], []]
  for (const sd of sds) {
    sdsByWeek[sd.dayOfWeek].push(sd)
  }
  sdsByWeek.push([])
  sdsByWeek = sdsByWeek.copyWithin(7, 0, 1).slice(1)

  const weekOfDays = getWeek().map((d, i) => (
    <WeekOfDay
      key={d}
      dayNum={d}
      dayStr={["月", "火", "水", "木", "金", "土", "日"][i]}
      DOW={i}
      sds={sdsByWeek[i]}
    />
  ))

  return (
    <GridContainer>
      <Divider />
      {weekOfDays}
    </GridContainer>
  )
}

const GridContainer = styled.div`
  grid-area: Calendar;
  display: grid;
  grid-template-columns: 5px repeat(7, 1fr);
  min-height: calc(100vh - ${style.Size.HeaderHeight});
`

const Divider = styled.div`
  ${style.Props.Border("right")};
`
