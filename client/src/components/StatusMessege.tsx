import * as React from "react"
import { ReactNode, ReactChildren } from "react"
import styled from "styled-components"
import { statusMessege, Set } from "../util/type/type"
import style from "../util/style"
import { rejects } from "assert"
import { log } from "util"

interface SMProps {
  m: statusMessege
  set: Set
}

const waitSecond = (sec: number): Promise<any> => {
  return new Promise((resolve) => {
    const id = setTimeout(() => {
      resolve(id)
    }, sec * 1000)
  })
}

export default class String extends React.Component<SMProps, {}, JSX.Element> {
  div: React.RefObject<HTMLDivElement>
  id = 0
  constructor(props: SMProps) {
    super(props)
    this.div = React.createRef()
  }

  componentDidUpdate() {
    if (this.id !== 0) {
      clearTimeout(this.id)
    }
    if (this.props.m.length !== 0) {
      this.hideSelf()
    }
  }

  hideSelf = async (): Promise<any> => {
    this.id = await waitSecond(15)
    clearTimeout(this.id)
    this.div.current.style.height = "0px"

    await waitSecond(0.3)
    clearTimeout(this.id)
    this.props.set([])
  }

  render() {
    const m = this.props.m
    const isShown = m.length !== 0 && m[0] !== ""
    const msgs = m.map((s, i) => <span key={i}>{s}</span>)

    return (
      <Wrapper isShown={isShown}>
        <div style={{ height: isShown ? "2.5rem" : "0px" }} ref={this.div}>
          {isShown ? msgs : null}
        </div>
      </Wrapper>
    )
  }
}

interface MProps {
  isShown: boolean
}

const Wrapper = styled.div<MProps>`
  div {
    display: flex;
    justify-content: center;
    width: 100vw;
    line-height: 2.5rem;
    position: absolute;
    z-index: 30;
    bottom: 0;
    transition: height 0.3s linear;

    span {
      background-color: ${style.Color.FontDrak};
      color: ${style.Color.BGWhite};
      padding: 0 2rem;
      margin: 0 1rem;
    }
  }
`
