import * as React from "react"
import { Component } from "react"
import styled from "styled-components"
import style from "../util/style"
import { Set, newWork } from "../util/type/type"
import User from "../util/type/user"
import { statusMessege } from "../util/type/type"
import { C } from "./App"
import Icon, { I } from "./icon/Icon"
import { log } from "util"
import InputText from "./InputText"
import axios from "axios"
import { resolve } from "path"
import { api, url } from "../util/axios"

interface WEProps {
  name: string
  url: string
  handleChange?: (e: React.FormEvent) => void
  save: (set: Set) => Promise<any>
}

export default ({ name, url, handleChange, save }: WEProps) => (
  <Wrapper>
    <WorkAria>
      <Icon i={I.Close} />
      <Title>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => handleChange(e)}
          placeholder="作品名を入力して下さい"
        />
        <C>
          {({ set }) => (
            <style.SC.Button blue onClick={() => save(set)}>
              保存
            </style.SC.Button>
          )}
        </C>
        <div>
          作品公式HP：
          <a href={`http://${url}`} rel="noopener noreferrer" target="_blank">
            {url}
          </a>
        </div>
      </Title>
    </WorkAria>
  </Wrapper>
)

const Wrapper = styled.div`
  width: 100vw;
  height: 100vw;
  background-color: ${style.Color.BGWhite};
  position: absolute;
  z-index: 20;
  top: 0px;
  left: 0px;
`
const WorkAria = styled.div`
  display: flex;
  ${style.Props.Border("bottom")};
  padding: 15px;
  img {
    margin-top: 15px;
    margin-left: 10px;
    width: 1rem;
    height: 1rem;
  }
`

const Title = styled.div`
  margin-left: 30px;

  input {
    width: 50vw;
    height: 2.5rem;
    background-color: ${style.Color.BGGray};
    border: none;
    font-size: 1.2rem;
    outline: 0;
  }

  span {
    padding: 0.5rem 2rem;
    margin-left: 30px;
  }

  div {
    margin-top: 20px;
    font-size: 1rem;
    a {
      text-decoration: none;
    }
  }
`
