import * as React from "react"
import styled from "styled-components"
const icons = [
  require("./logo.svg"),
  require("./menu.svg"),
  require("./search.svg"),
  require("./up.svg"),
  require("./down.svg"),
  require("./netflix.svg"),
  require("./amazon.svg"),
  require("./danime.svg"),
]

export enum IN {
  Logo,
  Menu,
  Search,
  Up,
  Down,
  Netflix,
  Amazon,
  Danime,
}

interface IconProps {
  i: number
}

export default ({ i }: IconProps): JSX.Element => <img src={icons[i]} alt={`${IN[i]}アイコン`} />
