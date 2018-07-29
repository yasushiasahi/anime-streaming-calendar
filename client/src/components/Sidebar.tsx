import * as React from "react"
import { Component } from "react"
import styled from "styled-components"

import style from "../util/style"
import { Service, Work } from "../util/type/type"

import CheckBoxsBox from "./CheckBoxsBox"
import MenuTitle from "./MenuTitle"

interface IsOpens {
  svs: boolean
  wks: boolean
  [key: string]: boolean
}

interface State {
  isOpens: IsOpens
}

interface SProps {
  svs: Service[]
  wks: Work[]
  handleCheckBoxClick: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    key: string
  ) => void
}

export default class Sidebar extends Component<SProps, State, JSX.Element> {
  constructor(props: SProps) {
    super(props)
    this.state = {
      isOpens: { svs: true, wks: true },
    }
  }

  handleClick = (key: string): void => {
    const copyIsOpens: IsOpens = Object.assign({}, this.state.isOpens)
    copyIsOpens[key] = !copyIsOpens[key]
    this.setState({
      isOpens: copyIsOpens,
    })
  }

  render() {
    const isOpens = this.state.isOpens
    const { svs, wks, handleCheckBoxClick } = this.props
    const handleClick = this.handleClick

    return (
      <Container>
        <CheckBoxsBox
          isOpen={isOpens.svs}
          data={svs}
          dataType={"svs"}
          handleClick={handleClick}
          handleCheckBoxClick={handleCheckBoxClick}
        />
        <CheckBoxsBox
          isOpen={isOpens.wks}
          data={wks}
          dataType={"wks"}
          handleClick={handleClick}
          handleCheckBoxClick={handleCheckBoxClick}
        />
      </Container>
    )
  }
}

const Container = styled.aside`
  grid-area: Sidebar;
  box-sizing: border-box;
  min-height: calc(100vh - ${style.Size.HeaderHeight});
  ${style.Props.Border("right")};
`
