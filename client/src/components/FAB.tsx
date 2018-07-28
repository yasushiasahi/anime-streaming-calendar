import * as React from "react"
import styled from "styled-components"
import { injectGlobal } from "styled-components"
import Icon, { I } from "./icon/Icon"
import { MouseEvent } from "react"

export default ({ toggleAdd }: any) => (
  <div id="fab" onClick={toggleAdd}>
    <Icon i={I.AddW} />
  </div>
)

injectGlobal`
#fab{
  display: fle;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  background: #db4437;
  text-align: center;
  border-radius: 50%;
  transition: 0.3s;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
  position: absolute;
  bottom: 30px;
  right: 20px;

  &:hover {
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 35%;
    height: 35%;
  }
}
`
