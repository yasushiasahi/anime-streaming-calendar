import * as React from "react"
import styled from "styled-components"
import style from "../util/style"

import { Work, Service } from "../util/type/type"

import Icon, { I } from "./icon/Icon"
import Logo from "./icon/Logo"
import { log } from "util"

interface Props {
  isOpen: boolean
  data: Service[] | Work[]
  dataType: string
  handleClick: (key: string) => void
  handleCheckBoxClick: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    key: string
  ) => void
}

export default ({
  isOpen,
  handleClick,
  data,
  handleCheckBoxClick,
  dataType,
}: Props): JSX.Element => {
  let dt
  let title: string
  let checkBoxs

  if (dataType == "svs") {
    title = "配信サービス"
    dt = data as Service[]
    checkBoxs = dt.map((d) => (
      <CBWrapper key={d.id}>
        <input
          checked={d.flag}
          type="checkBox"
          onChange={(e) => handleCheckBoxClick(e, d.id, dataType)}
        />
        <div>
          <Logo i={d.id} />
          <span>{d.name}</span>
        </div>
      </CBWrapper>
    ))
  } else if ((dataType = "wks")) {
    title = "作品"
    dt = data as Work[]
    checkBoxs = dt.map((d) => (
      <CBWrapper key={d.id}>
        <input
          checked={d.flag}
          type="checkBox"
          onChange={(e) => handleCheckBoxClick(e, d.id, dataType)}
        />
        <div>
          <span>{d.name}</span>
        </div>
      </CBWrapper>
    ))
  }

  return (
    <Wrapper>
      <TitleWrapper onClick={() => handleClick(dataType)}>
        <div>
          <p>{title}</p>
          {isOpen ? <Icon i={I.Up} /> : <Icon i={I.Down} />}
        </div>
      </TitleWrapper>
      {isOpen ? checkBoxs : null}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 4px;
  padding-bottom: 4px;
  ${style.Props.Border("bottom")};
`

const CBWrapper = styled.label`
  display: flex;
  align-items: center;
  padding: 5px 21px 5px 16px;
  cursor: pointer;
  user-select: none;
  transition: background-color 100ms linear;

  &:hover {
    background-color: ${style.Color.BGGray};
  }

  input {
    margin-right: 1rem;
    height: 0.8rem;
    display: block;
  }

  img {
    width: 1rem;
    height: 1rem;
    margin-right: 0.3rem;
  }

  span {
    color: ${style.Color.FontDrak};
  }
`

const TitleWrapper = styled.div`
  padding: 5px 21px 5px 16px;
  cursor: pointer;
  user-select: none;
  transition: background-color 100ms linear;

  &:hover {
    background-color: ${style.Color.BGDarkGray};
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      margin: 0;
    }

    img {
      height: 0.5rem;
    }
  }
`
