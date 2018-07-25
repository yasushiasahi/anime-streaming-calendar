import * as React from "react"
import styled from "styled-components"
import styles from "../helpers/styles"
import Login from "./Login"
import Signin from "./Signin"
import Icon, { I } from "./icon/Icon"

interface HState {
  inputText: InputText
  isShown: IsShown
}

interface IsShown {
  login: boolean
  signin: boolean
  [key: string]: boolean
}

interface InputText {
  name: string
  pass: string
  [key: string]: string
}

export default class extends React.Component<{}, HState, JSX.Element> {
  state = {
    inputText: { name: "", pass: "" },
    isShown: { login: false, signin: false },
  }

  HandleShown = (key: string) => {
    let copyIsShown: IsShown = Object.assign({}, this.state.isShown)
    copyIsShown[key] = !copyIsShown[key]
    this.setState({ isShown: copyIsShown })
  }

  HandleInputsChange = (e: React.FormEvent<HTMLInputElement>) => {
    let copyInputText: InputText = Object.assign({}, this.state.inputText)
    copyInputText[e.currentTarget.name] = e.currentTarget.value
    this.setState({ inputText: copyInputText })
  }

  render() {
    const { inputText, isShown } = this.state
    const { HandleShown, HandleInputsChange } = this
    const loginDom = (
      <Login name={inputText.name} pass={inputText.pass} HandleInputsChange={HandleInputsChange} />
    )
    const signinDom = (
      <Signin name={inputText.name} pass={inputText.pass} HandleInputsChange={HandleInputsChange} />
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
          <Hover onClick={() => HandleShown("login")}>
            <Icon i={I.Login} />
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
  height: ${styles.Sizes.HeaderHeight};
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 8px;

  position: relative;

  color: ${styles.Colors.FontLight};
  ${styles.Props.Border("bottom")};
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

const Hover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 100ms linear;

  &:hover {
    background-color: ${styles.Colors.BGDarkGray};
  }

  img[alt^="Menu"] {
    height: 0.8rem;
  }

  img {
    height: 2rem;
  }
`
