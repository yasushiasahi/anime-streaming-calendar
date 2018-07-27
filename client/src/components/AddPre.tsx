import * as React from "react"
import { Component } from "react"
import styled from "styled-components"
import style from "../util/style"
import { Set } from "../util/type/type"
import User from "../util/type/user"
import { statusMessege } from "../util/type/type"
import { C } from "./App"
import Icon, { I } from "./icon/Icon"
import { log } from "util"
import InputText from "./InputText"
import axios from "axios"
import { resolve } from "path"

interface APState {
  url: string
}

interface APProps {
  set: Set
}

export default class AddPre extends Component<APProps, APState, JSX.Element> {
  constructor(props: APProps) {
    super(props)
    this.state = {
      url: "",
    }
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ url: e.currentTarget.value })
  }

  handleClick = () => {
    const set = this.props.set
    const url = this.state.url
    if (url.length === 0) {
      set(["入力が空です"])
      return
    }
    const result = url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]
    if (result === null) {
      set([
        "入力が不正です。ブラウザのアドレスバーからコピーして貼り付けて下さい",
      ])
    }
  }

  render() {
    return (
      <Wrapper>
        <GridContainer>
          <IconWrapper>
            <Icon i={I.Close} />
          </IconWrapper>
          <FromWrapper>
            <InputText
              label={"アニメ公式ページURL"}
              name={"url"}
              value={this.state.url}
              handleChange={this.handleChange}
            />
          </FromWrapper>
          <ButtonWrapper>
            <p>追加したいアニメ公式HPのURLをペーストして下さい</p>
            <style.SC.Button blue onClick={() => this.handleClick()}>
              次へ
            </style.SC.Button>
          </ButtonWrapper>
        </GridContainer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 10;
  top: 0px;
  left: 0px;
`

const GridContainer = styled.div`
  width: 400px;
  height: 250px;
  display: grid;
  grid-template-rows: 12% 43% 45%;
  grid-template-areas:
    "IconWrapper"
    "FromWrapper"
    "ButtonWrapper";

  background-color: ${style.Color.BGWhite};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
`

const IconWrapper = styled.div`
  grid-area: IconWrapper;
  padding-top: 10px;
  padding-left: 10px;
  img {
    height: 100%;
  }
`

const FromWrapper = styled.div`
  grid-area: FromWrapper;
  display: flex;
  align-items: center;
  padding: 0 15px;
  align-content: space-around;
`

const Input = styled.div`
  width: 100%;
  padding: 10px;
  label {
    font-size: 0.7rem;
  }

  input {
    border: none;
    width: 100%;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  div {
    height: 2px;
    background-color: ${style.Color.BGDarkGray};
  }
`

const ButtonWrapper = styled.div`
  grid-area: ButtonWrapper;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-around;
  padding: 15px 0;
  background-color: ${style.Color.BGDarkGray};
  p {
    margin: 5px 0;
  }
  span {
    padding: 3px 15px;
  }
`
