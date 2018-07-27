import * as React from "react"
import { createContext } from "react"
import { hot } from "react-hot-loader"
import styled from "styled-components"

import { api, url } from "../util/axios"
import style from "../util/style"
import { statusMessege, Set, Service, newService } from "../util/type/type"
import User, { newUser } from "../util/type/user"

import Calendar from "./Calendar"
import Header from "./Header"
import Sidebar from "./Sidebar"
import StatusMessege from "./StatusMessege"
import { log } from "util"

interface AppState {
  msg: statusMessege
  ser: Service[]
}

export interface Contxet {
  set: Set
  user: User
}

const u = newUser({})
const s = newService()
const nullContext: Contxet = {
  set: (m: statusMessege, initFlag: boolean) => { },
  user: u,
}

const { Provider, Consumer } = createContext(nullContext)
export const C = Consumer

class App extends React.Component<{}, AppState, JSX.Element> {
  ct: Contxet = nullContext

  state = {
    msg: [""],
    ser: [{ id: 0, name: "", url: "" }],
  }

  componentDidMount() {
    this.init()
  }

  init = async () => {
    let m: statusMessege = []
    let ct = this.ct
    let ser: Service[]

    // ユーザーのログインを確認
    const { OK: uOK, Query: uQuery } = await api(url.checkSession, {})
    if (uOK) {
      ct.user = uQuery as User
      m.push("ログインしました")
    } else {
      if (ct.user.id !== 0) {
        m.push("ログアウトしました")
      }
      m.push(uQuery as string)
      ct.user = newUser({})
    }

    // serviceのデータを取得
    const { OK: sOK, Query: sQuery } = await api(url.getService, {})
    if (sOK) {
      const sQ = sQuery as Service[]
      ser = sQ.map((s) => {
        s.flag = true
        return s
      })
    } else {
      m.push(sQuery as string)
      ser = [{ id: 0, name: "", url: "" }]
    }

    this.setState({
      msg: m,
      ser: ser,
    })
  }

  handleSerClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ): void => {
    console.log(e.target.checked)
    const ser = this.state.ser.map((s: Service) => {
      if (s.id === id) {
        console.log("通過")
        s.flag = e.target.checked
      }
      return s
    })
    this.setState({ ser: ser })
  }

  set = (m: statusMessege, initFlag: boolean = false): void => {
    this.setState({ msg: m })
    if (initFlag) {
      this.init()
    }
  }

  render() {
    this.ct.set = this.set

    console.log("msg:", this.state.msg)
    console.log(" ct:", this.ct)

    return (
      <GridContainer>
        <Provider value={this.ct}>
          <Header />
        </Provider>
        <Sidebar ser={this.state.ser} handleSerClick={this.handleSerClick} />
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
