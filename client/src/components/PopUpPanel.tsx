import * as React from "react"
import { Component } from "react"
import styled from "styled-components"
import { C } from "./App"

import style from "../util/style"
import Icon, { I } from "./icon/Icon"

class PopUpPanel extends Component {
  render() {
    return (
      <Wrapper>
        <GridContainer>
          <IconWrapper>
            <Icon i={I.Close} />
          </IconWrapper>
          <FromWrapper />
          <ButtonWrapper>
            <p>
              追加したいアニメ公式HPのURLを<br />
              ブラウザのアドレスバーからコピーして貼り付けて下さい
            </p>
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
  padding: 10px 10px;
  background-color: ${style.Color.BGDarkGray};
  p {
    text-align: center;
    font-size: 0.9rem;
    margin: 5px 0;
  }
  span {
    padding: 3px 15px;
  }
`
