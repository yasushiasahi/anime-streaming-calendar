import * as React from "react"
import { Component, createContext } from "react"
import { hot } from "react-hot-loader"
import styled from "styled-components"

import { api, url } from "../util/axios"
import style from "../util/style"
import {
  statusMessege,
  Set,
  Service,
  newService,
  Work,
  newWork,
} from "../util/type/type"
import User, { newUser } from "../util/type/user"

import Calendar from "./Calendar"
import Header from "./Header"
import Sidebar from "./Sidebar"
import FAB from "./FAB"
import AddPre from "./AddPre"
import WorkEditer from "./WorkEditer"
import StatusMessege from "./StatusMessege"
import Add from "./Add"
import { log } from "util"

interface AppState {
  msg: statusMessege
  svs: Service[]
  wks: Work[]
  [key: string]: statusMessege | Service[] | Work[]
}

export interface Contxet {
  set: Set
  user: User
}

const u = newUser({})
const nullContext: Contxet = {
  set: (m: statusMessege, initFlag: boolean) => { },
  user: u,
}

const { Provider, Consumer } = createContext(nullContext)
export const C = Consumer

class App extends Component<{}, AppState, JSX.Element> {
  ct: Contxet = nullContext

  state = {
    msg: [""],
    svs: [{ id: 0, name: "", url: "", flag: false }],
    wks: [
      {
        id: 0,
        name: "",
        url: "",
        onair: false,
        flag: false,
      },
    ],
  }

  componentDidMount() {
    this.init()
  }

  init = async () => {
    let m: statusMessege = []
    let ct = this.ct
    let svs: Service[]
    let wks: Work[]

    // ユーザーのログインを確認
    const { OK: uOK, Query: uQuery } = await api(url.checkSession, {})
    if (uOK) {
      ct.user = uQuery as User
      m.push("ログインしました")
    } else {
      if (ct.user.id !== 0) {
        m.push("ログアウトしました")
      }
      ct.user = newUser({})
    }

    // serviceデータを取得
    const { OK: sOK, Query: sQuery } = await api(url.getService, {})
    if (sOK) {
      const sQ = sQuery as Service[]
      svs = sQ.map((s) => {
        s.flag = true
        return s
      })
    } else {
      m.push(sQuery as string)
      svs = []
    }

    // worksデータを取得
    const { OK: wkOK, Query: wkQuery } = await api(url.getWorks, {})
    if (wkOK) {
      const wkQ = wkQuery as Work[]
      wks = wkQ.map((w) => {
        w.flag = true
        return w
      })
    } else {
      m.push(wkQuery as string)
      wks = []
    }

    this.setState({
      msg: m,
      svs: svs,
      wks: wks,
    })
  }

  set = (m: statusMessege, initFlag: boolean = false): void => {
    this.setState({ msg: m })
    if (initFlag) {
      this.init()
    }
  }

  handleCheckBoxClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    key: string
  ): void => {
    if ((key = "svs")) {
      const svs = this.state.svs.map((sv) => {
        if (sv.id === id) {
          sv.flag = e.target.checked
        }
        return sv
      })
      this.setState({ svs: svs })
    } else if ((key = "wks")) {
      const wks = this.state.wks.map((wk) => {
        if (wk.id === id) {
          wk.flag = e.target.checked
        }
        return wk
      })
      this.setState({ wks: wks })
    }
  }

  render() {
    const { msg, svs, wks } = this.state
    const { ct, set, handleCheckBoxClick } = this
    this.ct.set = this.set

    console.log("msg:", msg)
    console.log(" ct:", ct)

    return (
      <Provider value={ct}>
        <GridContainer>
          <Header />
          <Sidebar
            svs={svs}
            wks={wks}
            handleCheckBoxClick={handleCheckBoxClick}
          />
          <Calendar />
          <Add />
          <StatusMessege m={msg} set={set} />
        </GridContainer>
      </Provider>
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
