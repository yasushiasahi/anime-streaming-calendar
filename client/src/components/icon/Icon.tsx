/// <reference path="./index.d.ts" />
import * as React from "react"
import styled from "styled-components"

import * as down from "./down.svg"
import * as login from "./login.svg"
import * as logo from "./logo.svg"
import * as logoTypo from "./logo_typo.svg"
import * as logout from "./logout.svg"
import * as menu from "./menu.svg"
import * as search from "./search.svg"
import * as up from "./up.svg"

import * as amazon from "./amazon.svg"
import * as danime from "./danime.svg"
import * as netflix from "./netflix.svg"

const svgs = [down, login, logo, logoTypo, logout, menu, search, up, amazon, danime, netflix]

export enum I {
  Down,
  Login,
  Logo,
  LogoTypo,
  Logout,
  Menu,
  Search,
  Up,
  Amazon,
  Danime,
  Netflix,
}

interface IconProps {
  i: number
}

export default ({ i }: IconProps): JSX.Element => <img src={svgs[i]} alt={`${I[i]}アイコン`} />
