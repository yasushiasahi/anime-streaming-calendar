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
  SSBW,
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
import Ditail from "./Ditail"
import { log } from "util"

interface AppState {
  msg: statusMessege
  svs: Service[]
  wks: Work[]
  sds: Schedule[]
  ssbws: SSBW[]
  isSidebarShown: boolean
  ditailInfo: {
    left: number
    right: number
    top: number
    wkId: number
    DOW: number
  }
}

export interface Contxet {
  set: Set
  user: User
  svs: Service[]
  wks: Work[]
  showDitail: (
    e: React.MouseEvent<HTMLDivElement>,
    wkId: number,
    DOW: number
  ) => void
}

const u = newUser({})
const svs = [newService()]
const wks = [newWork({})]
const nullContext: Contxet = {
  set: (m: statusMessege, initFlag: boolean) => { },
  user: u,
  svs: svs,
  wks: wks,
  showDitail: null,
}

const { Provider, Consumer } = createContext(nullContext)
export const C = Consumer

class App extends Component<{}, AppState, JSX.Element> {
  ct: Contxet = nullContext
  constructor(props: any) {
    super(props)
    this.state = {
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
      ssbws: null,
      isSidebarShown: true,
      ditailInfo: { left: 0, right: 0, top: 0, wkId: 0, DOW: -1 },
    }
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
    let ssbws: SSBW[]

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

    const { OK: ssbwsOK, Query: ssbwsQuery } = await api(
      url.getServiceScheduleByWorks,
      {}
    )
    if (ssbwsOK) {
      ssbws = ssbwsQuery
    } else {
      m.push(ssbwsQuery)
    }

    this.setState({
      msg: m,
      svs: svs,
      wks: wks,
      sds: sds,
      ssbws: ssbws,
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

  showDitail = (
    e: React.MouseEvent<HTMLDivElement>,
    wkId: number,
    DOW: number
  ): void => {
    const copyDitailInfo = Object.assign({}, this.state.ditailInfo)
    copyDitailInfo.left = e.currentTarget.getBoundingClientRect().left
    copyDitailInfo.right = e.currentTarget.getBoundingClientRect().right
    copyDitailInfo.top = e.currentTarget.getBoundingClientRect().top
    copyDitailInfo.wkId = wkId
    copyDitailInfo.DOW = DOW
    this.setState({ ditailInfo: copyDitailInfo })
  }

  closeDitail = () =>
    this.setState({
      ditailInfo: { left: 0, right: 0, top: 0, wkId: 0, DOW: -1 },
    })

  render() {
    const { msg, svs, wks, sds, ssbws, isSidebarShown, ditailInfo } = this.state
    const {
      ct,
      set,
      handleCheckBoxClick,
      toggleSidebar,
      showDitail,
      closeDitail,
    } = this
    ct.set = this.set
    ct.svs = svs
    ct.wks = wks
    ct.wks = wks
    ct.showDitail = showDitail

    // console.log("msg:", msg)
    // console.log(" ct:", ct)

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
          <Ditail info={ditailInfo} ssbws={ssbws} closeDitail={closeDitail} />
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
