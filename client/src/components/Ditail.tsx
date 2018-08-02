import * as React from "react"
import styled from "styled-components"
import { SSBW } from "../util/type/type"
import style from "../util/style"
import { getDay } from "./helper"
import Logo from "./icon/Logo"
import Icon, { I } from "./icon/Icon"
import { log } from "util"

interface DProps {
  info: { left: number; right: number; top: number; wkId: number; DOW: number }
  ssbws: SSBW[]
  closeDitail: () => void
}

export default ({
  info: { left, right, top, wkId, DOW },
  ssbws,
  closeDitail,
}: DProps) => {
  if (ssbws === null || wkId === 0) {
    return null
  }

  const { work, sdsvs } = ssbws.find((ssbw) => ssbw.work.id === wkId)
  const scheduleList = sdsvs.map((sdsv, i) => (
    <li key={i}>
      <span>
        {getDay(sdsv.DOW)}
        <Logo i={sdsv.svId} />
        {sdsv.svName}
      </span>
      <a href={sdsv.sdUrl} rel="noopener noreferrer" target="_blank">
        視聴ページを開く
      </a>
    </li>
  ))
  const dimensionX = DOW <= 1 ? right + 12 : left - 412

  return (
    <Wrapper x={dimensionX} y={top}>
      <WorkWrapper>
        <div onClick={closeDitail}>
          <Icon i={I.CloseW} />
        </div>
        <p>
          <span>{work.name}</span>
          <a
            href={`http://${work.url}`}
            rel="noopener noreferrer"
            target="_blank">
            公式サイトリンク
          </a>
        </p>
      </WorkWrapper>
      <ScheduleWrapper>{scheduleList}</ScheduleWrapper>
    </Wrapper>
  )
}

interface WProps {
  x: number
  y: number
}

const Wrapper = styled.div<WProps>`
  position: absolute;
  top: ${(p) => p.y}px;
  left: ${(p) => p.x}px;
  transition: all 0.2s ease-in-out;
  ${style.Props.BoxShadow()};
`

const WorkWrapper = styled.div`
  height: 100px;
  width: 400px;
  display: grid;
  grid-template-rows: auto auto;

  padding: 15px;
  background-color: #3f51b5;
  color: ${style.Color.BGWhite};

  div {
    justify-self: end;
    cursor: pointer;

    img[alt$="アイコン"] {
      height: 1rem;
      width: 1rem;
    }
  }

  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin: 0;

    span {
      font-size: 1.2rem;
    }

    a {
      color: ${style.Color.BGWhite};
      font-size: 0.7rem;
    }
  }
`

const ScheduleWrapper = styled.ul`
  height: 150px;
  background-color: ${style.Color.BGWhite};
  padding: 15px;
  margin: 0;
  list-style: none;

  li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.7rem;

    span {
      display: inline-flex;
      align-items: center;

      img[alt$="ロゴ"] {
        height: 1rem;
        width: 1rem;
        margin: 0 0.3rem 0 1rem;
      }
    }

    a {
      font-size: 0.8rem;
    }
  }
`
