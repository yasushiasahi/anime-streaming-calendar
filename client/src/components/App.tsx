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
  Schedule,
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
  sds: Schedule[]
  isSidebarShown: boolean
}

export interface Contxet {
  set: Set
  user: User
  svs: Service[]
  wks: Work[]
}

const u = newUser({})
const svs = [newService()]
const wks = [newWork({})]
const nullContext: Contxet = {
  set: (m: statusMessege, initFlag: boolean) => { },
  user: u,
  svs: svs,
  wks: wks,
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
        userId: 0,
        flag: false,
      },
    ],
    sds: [
      {
        id: 0,
        dayOfWeek: 0,
        url: "",
        userId: 0,
        workId: 0,
        serviceId: 0,
      },
    ],
    isSidebarShown: true,
  }

  componentDidMount() {
    this.init([])
  }

  toggleSidebar = () => {
    this.setState({ isSidebarShown: !this.state.isSidebarShown })
  }

  init = async (m: statusMessege) => {
    let ct = this.ct
    let svs: Service[]
    let wks: Work[]
    let sds: Schedule[]

    // ユーザーのログインを確認
    const { OK: uOK, Query: uQuery } = await api(url.checkSession, {})
    if (uOK) {
      ct.user = uQuery as User
    } else {
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
      if (wkQ !== null) {
        wks = wkQ.map((w) => {
          w.flag = true
          return w
        })
      } else {
        wks = []
      }
    } else {
      m.push(wkQuery as string)
      wks = []
    }

    const { OK: sdOK, Query: sdQuery } = await api(url.getSchedules, {})
    if (sdOK) {
      sds = sdQuery
    } else {
      sds = []
      m.push(sdQuery)
    }

    this.setState({
      msg: m,
      svs: svs,
      wks: wks,
      sds: sds,
    })
  }

  set = (m: statusMessege, initFlag: boolean = false): void => {
    if (initFlag) {
      this.init(m)
    } else {
      this.setState({ msg: m })
    }
  }

  handleCheckBoxClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    key: string
  ): void => {
    if (key === "svs") {
      const svs = this.state.svs.map((sv) => {
        if (sv.id === id) {
          sv.flag = e.target.checked
        }
        return sv
      })
      this.setState({ svs: svs })
    } else if (key === "wks") {
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
    const { msg, svs, wks, sds, isSidebarShown } = this.state
    const { ct, set, handleCheckBoxClick, toggleSidebar } = this
    this.ct.set = this.set
    this.ct.svs = svs
    this.ct.wks = wks

    console.log("msg:", msg)
    console.log(" ct:", ct)

    const sidebar = (
      <Sidebar svs={svs} wks={wks} handleCheckBoxClick={handleCheckBoxClick} />
    )

    return (
      <Provider value={ct}>
        <GridContainer isSidebarShown={isSidebarShown}>
          <Header toggleSidebar={toggleSidebar} />
          {isSidebarShown ? sidebar : null}
          <Calendar sds={sds} />
          {ct.user.id !== 0 ? <Add /> : null}
          <StatusMessege m={msg} set={set} />
        </GridContainer>
      </Provider>
    )
  }
}

interface GCProps {
  isSidebarShown: boolean
}

const GridContainer = styled.div<GCProps>`
  display: grid;
  position: relative;
  ${(p) => {
    if (p.isSidebarShown) {
      return `
        grid-template-columns: ${style.Size.SidebarWidth} auto;
        grid-template-rows: ${style.Size.HeaderHeight} auto;
        grid-template-areas:
          "Header   Header"
          "Sidebar  Calendar";
      `
    } else {
      return `
        grid-template-columns: auto;
        grid-template-rows: ${style.Size.HeaderHeight} auto;
        grid-template-areas:
          "Header"
          "Calendar";
      `
    }
  }};
`

export default hot(module)(App)
