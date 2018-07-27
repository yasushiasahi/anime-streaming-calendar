import * as React from "react"
import styled from "styled-components"
import style from "../util/style"
import { Set } from "../util/type/type"
import User from "../util/type/user"
import { C } from "./App"
import Icon, { I } from "./icon/Icon"
import { log } from "util"

interface LProps {
  name: string
  pass: string
  handleChange: (e: React.FormEvent) => void
  handleClick: (key: string) => void
  login: (set: Set) => Promise<any>
}

export default ({
  name,
  pass,
  handleChange,
  handleClick,
  login,
}: LProps): JSX.Element => {
  const loginForm: JSX.Element = (
    <FromWrapper>
      <Input>
        <label>ユーザー名</label>
        <br />
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => handleChange(e)}
        />
        <div />
      </Input>
      <Input>
        <label>パスワード</label>
        <br />
        <input
          type="text"
          name="pass"
          value={pass}
          onChange={(e) => handleChange(e)}
        />
        <div />
      </Input>
    </FromWrapper>
  )

  const loginButtns = (set: Set): JSX.Element => (
    <ButtonWrapper>
      <style.SC.Button onClick={() => handleClick("signin")}>
        アカウントを作成
      </style.SC.Button>
      <style.SC.Button onClick={() => login(set)}>ログイン</style.SC.Button>
    </ButtonWrapper>
  )

  const logoutButtn = (set: Set): JSX.Element => (
    <ButtonWrapper>
      <style.SC.Button
        onClick={() => {
          document.cookie = "_cookie=; max-age=0"
          handleClick("login")
          set([], true)
        }}>
        ログアウト
      </style.SC.Button>
    </ButtonWrapper>
  )

  const Loging = (u: User): JSX.Element => <p>{`${u.name}でログイン中`}</p>

  return (
    <C>
      {({ set, user }) => (
        <GridContainer>
          <IconWrapper>
            <Icon i={I.Logo} />
          </IconWrapper>
          {user.id === 0 ? loginForm : Loging(user)}
          {user.id === 0 ? loginButtns(set) : logoutButtn(set)}
        </GridContainer>
      )}
    </C>
  )
}

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

  background-color: ${style.Color.BGWhite};
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
    background-color: ${style.Color.BGDarkGray};
  }
`

const ButtonWrapper = styled.div`
  grid-area: ButtonWrapper;
  display: flex;
  justify-content: space-around;
  align-items: center;

  background-color: ${style.Color.BGDarkGray};

  span {
    padding: 3px 15px;
  }
`
