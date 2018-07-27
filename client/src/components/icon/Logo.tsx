/// <reference path="./index.d.ts" />
import * as React from "react"
import styled from "styled-components"

import * as dtv from "./dtv.svg"
import * as hulu from "./hulu.svg"
import * as unext from "./unext.svg"
import * as amazon from "./amazon.svg"
import * as netflix from "./netflix.svg"
import * as danime from "./danime.svg"
import * as auvpass from "./auvpass.svg"
import * as niconico from "./niconico.svg"
import style from "../../util/style"

const svgs = [
  null,
  dtv,
  hulu,
  unext,
  amazon,
  netflix,
  danime,
  auvpass,
  niconico,
]

interface LProps {
  i: number
}

export default ({ i }: LProps): JSX.Element => (
  <img src={svgs[i]} alt={`${svgs[i]}ロゴ`} />
)

const Img = styled.img`
  width: 1rem;
`
