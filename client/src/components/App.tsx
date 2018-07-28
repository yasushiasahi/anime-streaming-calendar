import * as React from "react"
import { Component } from "react"
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
import FAB from "./FAB"
import AddPre from "./AddPre"
import WorkEditer from "./WorkEditer"
import StatusMessege from "./StatusMessege"
import { log } from "util"

interface AppState {
  msg: statusMessege
  ser: Service[]
  isEdit: boolean
  isAdd: boolean
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
    ser: [{ id: 0, name: "", url: "" }],
    isEdit: false,
    isAdd: false,
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

  set = (m: statusMessege, initFlag: boolean = false): void => {
    this.setState({ msg: m })
    if (initFlag) {
      this.init()
    }
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

  toggleEdit() {
    const { isEdit, isAdd } = this.state
    if (this.state.isAdd) {
      this.setState({
        isEdit: !this.state.isEdit,
        isAdd: false,
      })
    }
    this.setState({ isEdit: !this.state.isEdit })
  }

  toggleAdd = () => {
    console.log("クリック")
    this.setState({ isAdd: !this.state.isAdd })
  }

  render() {
    const { msg, ser, isEdit, isAdd } = this.state
    const { ct, set, handleSerClick, toggleAdd, toggleEdit } = this
    this.ct.set = this.set

    console.log("msg:", msg)
    console.log(" ct:", ct)

    return (
      <Provider value={ct}>
        <GridContainer>
          <Header />
          <Sidebar ser={ser} handleSerClick={handleSerClick} />
          <Calendar />
          <FAB toggleAdd={toggleAdd} />
          {isAdd ? <AddPre set={set} isEdit={isEdit} /> : null}
          {isEdit ? <WorkEditer /> : null}
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
