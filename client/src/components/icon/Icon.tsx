/// <reference path="./index.d.ts" />
import * as React from "react"
import styled from "styled-components"

import * as add from "./add.svg"
import * as addW from "./add_white.svg"
import * as down from "./down.svg"
import * as close from "./close.svg"
import * as login from "./login.svg"
import * as logo from "./logo.svg"
import * as logoTypo from "./logo_typo.svg"
import * as logout from "./logout.svg"
import * as menu from "./menu.svg"
import * as search from "./search.svg"
import * as up from "./up.svg"

const svgs = [
  add,
  addW,
  close,
  down,
  login,
  logo,
  logoTypo,
  logout,
  menu,
  search,
  up,
]

export enum I {
  Add,
  AddW,
  Close,
  Down,
  Login,
  Logo,
  LogoTypo,
  Logout,
  Menu,
  Search,
  Up,
}

interface IconProps {
  i: number
}

export default ({ i }: IconProps): JSX.Element => (
  <img src={svgs[i]} alt={`${I[i]}アイコン`} />
)
