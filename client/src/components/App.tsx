import * as React from "react"
import { createContext } from "react"
import { hot } from "react-hot-loader"
import styled from "styled-components"

import { checkSession } from "../util/axios"
import style from "../util/style"
import { statusMessege, Set } from "../util/type/type"
import User, { newUser } from "../util/type/user"

import Calendar from "./Calendar"
import Header from "./Header"
import Sidebar from "./Sidebar"
import StatusMessege from "./StatusMessege"
import { log } from "util"

interface AppState {
  msg: statusMessege
}

export interface Contxet {
  set: Set
  user: User
}

const u: User = newUser({})
const nullContext: Contxet = {
  set: (m: statusMessege, updateflag: boolean) => { },
  user: u,
}

const { Provider, Consumer } = createContext(nullContext)
export const C = Consumer

class App extends React.Component<{}, AppState, JSX.Element> {
  ct: Contxet = nullContext

  state = {
    msg: [""],
  }

  componentDidMount() {
    this.init()
  }

  init = async () => {
    let m: statusMessege = []
    let ct = this.ct

    let { OK, Query } = await checkSession()
    if (OK) {
      ct.user = Query as User
      m.push("ログインしました")
    } else {
      if (ct.user.id !== 0) {
        m.push("ログアウトしました")
      }
      ct.user = newUser({})
    }

    this.setState({ msg: m })
  }

  set = (m: statusMessege, initFlag: boolean = false): void => {
    this.setState({ msg: m })
    if (initFlag) {
      this.init()
    }
  }

  render() {
    const ct: Contxet = this.ct
    ct.set = this.set
    console.log("msg:", this.state.msg)
    console.log(" ct:", ct)

    return (
      <GridContainer>
        <Provider value={ct}>
          <Header />
        </Provider>
        <Sidebar />
        <Calendar />
        <StatusMessege m={this.state.msg} set={this.set} />
      </GridContainer>
    )
  }
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${style.Size.SidebarWidth} auto;
  grid-template-rows: ${style.Size.HeaderHeight} auto;
  grid-template-areas:
    "Header   Header"
    "Sidebar  Calendar";

  position: relative;
`

export default hot(module)(App)
