import * as React from "react"
import { createContext } from "react"
import { hot } from "react-hot-loader"
import styled from "styled-components"

import { checkSession } from "../util/axios"
import style from "../util/style"
import { statusMessege } from "../util/type/type"
import User, { newUser } from "../util/type/user"

import Calendar from "./Calendar"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { log } from "util"

interface AppState {
  msg: statusMessege
}

export interface Contxet {
  msg: statusMessege
  user: User
}

const u: User = newUser({})
const nullContext: Contxet = {
  msg: [],
  user: u,
}

const { Provider, Consumer: c } = createContext(nullContext)
export const Consumer = c

class App extends React.Component<{}, AppState, JSX.Element> {
  ct: Contxet = nullContext

  state = {
    msg: [""],
  }

  componentDidMount() {
    this.getAllData()
  }

  getAllData = async () => {
    let m: statusMessege = []

    let { ok, data } = await checkSession()
    if (ok) {
      this.ct.user = newUser({ id: data.id, name: data.name })
      m.push("ログインしました")
    }

    this.setState({ msg: m })
  }

  toggleLogin = (m: statusMessege): void => {
    this.setState({ msg: m })
  }

  render() {
    const ct: Contxet = this.ct
    ct.msg = this.state.msg

    return (
      <GridContainer>
        <Provider value={ct}>
          <Header />
        </Provider>
        <Sidebar />
        <Calendar />
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
`

export default hot(module)(App)
