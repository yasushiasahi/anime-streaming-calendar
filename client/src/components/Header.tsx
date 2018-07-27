import * as React from "react"
import styled from "styled-components"

import style from "../util/style"
import { api, url } from "../util/axios"
import { C } from "./App"
import User, { newUser } from "../util/type/user"
import { statusMessege, Set } from "../util/type/type"
import { isValid } from "./helper"

import Login from "./Login"
import Signin from "./Signin"
import Icon, { I } from "./icon/Icon"
import InputText from "./InputText"

import { checkServerIdentity } from "tls"
import { log } from "util"

interface HState {
  inputText: InputText
  isShown: IsShown
}

interface IsShown {
  login: boolean
  signin: boolean
  [key: string]: boolean
}

export interface InputText {
  name: string
  pass: string
  passRe: string
  [key: string]: string
}

export default class extends React.Component<{}, HState, JSX.Element> {
  state = {
    inputText: { name: "", pass: "", passRe: "" },
    isShown: { login: false, signin: false },
  }

  handleClick = (key: string): void => {
    const copyIsShown: IsShown = Object.assign({}, this.state.isShown)
    copyIsShown[key] = !copyIsShown[key]
    this.setState({ isShown: copyIsShown })
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const copyInputText: InputText = Object.assign({}, this.state.inputText)
    copyInputText[e.currentTarget.name] = e.currentTarget.value
    this.setState({ inputText: copyInputText })
  }

  initState = (): void => {
    this.setState({
      inputText: { name: "", pass: "", passRe: "" },
      isShown: { login: false, signin: false },
    })
  }

  login = async (set: Set): Promise<any> => {
    const t: InputText = this.state.inputText
    if (isValid(t).length !== 0) {
      set(isValid(t))
      return
    }

    const u = newUser({ name: t.name, password: t.pass })
    const { OK, Query } = await api(url.login, u)
    if (!OK) {
      set([Query as string])
      return
    }

    this.initState()
    set([], true)
  }

  signin = async (set: Set): Promise<any> => {
    const t: InputText = this.state.inputText
    if (isValid(t, true).length !== 0) {
      set(isValid(t))
      return
    }

    const u = newUser({ name: t.name, password: t.pass })
    const { OK, Query } = await api(url.signin, u)
    if (!OK) {
      set([Query as string])
      return
    }

    this.initState()
    set([], true)
  }

  render() {
    const { inputText, isShown } = this.state
    const { handleClick, handleChange, initState, login, signin } = this
    const loginDom = (
      <Login
        name={inputText.name}
        pass={inputText.pass}
        handleChange={handleChange}
        handleClick={handleClick}
        login={login}
      />
    )
    const signinDom = (
      <Signin
        name={inputText.name}
        pass={inputText.pass}
        passRe={inputText.passRe}
        handleChange={handleChange}
        handleClick={handleClick}
        initState={initState}
        signin={signin}
      />
    )

    return (
      <FlexWrappar>
        <LeftFlexContainer>
          <Hover>
            <Icon i={I.Menu} />
          </Hover>
          <Icon i={I.Logo} />
          <span>アニメ ストリーミング カレンダー</span>
        </LeftFlexContainer>
        <RightFlexContainer>
          <Icon i={I.Search} />
          <span>？</span>
          <Hover onClick={() => handleClick("login")}>
            <C>
              {({ user }) =>
                user.id !== 0 ? (
                  <UserInitial>
                    <p>{user.name[0]}</p>
                  </UserInitial>
                ) : (
                    <Icon i={I.Login} />
                  )
              }
            </C>
          </Hover>
        </RightFlexContainer>
        {isShown.login ? loginDom : null}
        {isShown.signin ? signinDom : null}
      </FlexWrappar>
    )
  }
}

const FlexWrappar = styled.header`
  grid-area: Header;
  height: ${style.Size.HeaderHeight};
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 8px;

  position: relative;

  color: ${style.Color.FontLight};
  ${style.Props.Border("bottom")};
`

const LeftFlexContainer = styled.div`
  min-width: 480px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  img[alt^="Logo"] {
    height: 2rem;
  }

  span {
    font-size: 1.4rem;
  }
`

const RightFlexContainer = styled.div`
  min-width: 150px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  span:nth-of-type(1) {
    font-size: 1.5rem;
  }

  img[alt^="Search"] {
    height: 1.2rem;
  }
`

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  cursor: pointer;
  border-radius: 50%;
`

const Hover = Circle.extend`
  transition: background-color 100ms linear;

  &:hover {
    background-color: ${style.Color.BGDarkGray};
  }

  img[alt^="Menu"] {
    height: 0.8rem;
  }

  img {
    height: 2rem;
  }
`

const UserInitial = Circle.extend`
  width: 40px;
  height: 40px;
  background-color: #006600;
  p {
    font-size: 1.5rem;
    color: ${style.Color.BGWhite};
  }
`
