import * as React from "react"
import styled from "styled-components"
import styles from "../helpers/styles"
import Icon, { I } from "./icon/Icon"

interface LProps {
  name: string
  pass: string
  HandleInputsChange: (e: React.FormEvent) => void
}

export default ({ name, pass, HandleInputsChange }: LProps) => (
  <GridContainer>
    <IconWrapper>
      <div>ログイン</div>
      <Icon i={I.Logo} />
    </IconWrapper>
    <FromWrapper>
      <Input>
        <label>ユーザー名</label>
        <br />
        <input type="text" name="name" value={name} onChange={e => HandleInputsChange(e)} />
        <div />
      </Input>
      <Input>
        <label>パスワード</label>
        <br />
        <input type="text" name="pass" value={pass} onChange={e => HandleInputsChange(e)} />
        <div />
      </Input>
    </FromWrapper>
    <ButtonWrapper>
      <styles.SC.Button>アカウントを作成</styles.SC.Button>
      <styles.SC.Button>ログイン</styles.SC.Button>
    </ButtonWrapper>
  </GridContainer>
)

const GridContainer = styled.div`
  width: 300px;
  height: 190px;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 140px 1fr;
  grid-template-areas:
    "IconWrapper   FromWrapper"
    "ButtonWrapper ButtonWrapper";

  position: absolute;
  z-index: 10;
  right: 8px;
  top: 62px;

  background-color: ${styles.Colors.BGWhite};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
`

const IconWrapper = styled.div`
  grid-area: IconWrapper;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-content: center;

  div {
    color: black;
    padding-right: 5px;
    font-size: 1rem;
  }

  img {
    height: 50%;
    width: 90%;
  }
`

const FromWrapper = styled.div`
  grid-area: FromWrapper;
  display: flex;
  padding: 10px 0;
  flex-wrap: wrap;
  justify-content: center;
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
    background-color: ${styles.Colors.BGDarkGray};
  }
`

const ButtonWrapper = styled.div`
  grid-area: ButtonWrapper;
  display: flex;
  justify-content: space-around;
  align-items: center;

  background-color: ${styles.Colors.BGDarkGray};

span{
  padding:3px 15px;
}
`
