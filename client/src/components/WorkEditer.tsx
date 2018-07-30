import * as React from "react"
import { Component } from "react"
import styled from "styled-components"
import style from "../util/style"
import {
  Set,
  statusMessege,
  Work,
  newWork,
  Service,
  Schedule,
  newSchedule,
} from "../util/type/type"
import User from "../util/type/user"
import { C } from "./App"
import Icon, { I } from "./icon/Icon"
import { log } from "util"
import InputText from "./InputText"
import axios from "axios"
import { resolve } from "path"
import { api, url } from "../util/axios"

interface Texts {
  name: string
  wUrl: string
  sUrl: string
  [key: string]: string
}

interface Selects {
  dayOfWeek: number
  serviceId: number
  [key: string]: number
}

interface WEProps {
  work: Work
  closeEditer: () => void
}

interface WPState {
  selects: Selects
  texts: Texts
  isAddSchedule: boolean
}

const makeServiceOptions = (svs: Service[]) => {
  return svs.map((sv) => (
    <option key={sv.id} value={sv.id}>
      {sv.name}
    </option>
  ))
}

export default class WorkEditer extends Component<
  WEProps,
  WPState,
  JSX.Element
  > {
  constructor(props: WEProps) {
    super(props)
    this.state = {
      selects: {
        dayOfWeek: 1,
        serviceId: 1,
      },
      texts: {
        name: this.props.work.name,
        wUrl: this.props.work.url,
        sUrl: "",
      },
      isAddSchedule: false,
    }
  }

  handleClick = () => {
    this.setState({ isAddSchedule: !this.state.isAddSchedule })
  }

  handleSelectChange = (e: React.FormEvent<HTMLSelectElement>): void => {
    const copySelects: Selects = Object.assign({}, this.state.selects)
    copySelects[e.currentTarget.name] = parseInt(e.currentTarget.value)
    this.setState({ selects: copySelects })
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const copyTexts: Texts = Object.assign({}, this.state.texts)
    copyTexts[e.currentTarget.name] = e.currentTarget.value
    this.setState({ texts: copyTexts })
  }

  save = async (set: Set, userId: number) => {
    const {
      texts: { name, wUrl, sUrl },
      selects: { dayOfWeek, serviceId },
      isAddSchedule,
    } = this.state
    let work = this.props.work
    let m: statusMessege = []

    if (work.id === 0) {
      console.log("111111111111111111111")
      if (name.length === 0) {
        m.push("タイトルを入力して下さい")
        return
      }
      work.name = name
      work.userId = userId
      console.log(work)
      const { OK, Query } = await api(url.addWork, work)
      if (!OK) {
        m.push(Query)
        return
      }
      work = Query as Work
    }

    if (work.name !== name) {
      console.log("2222222222222222222222222222")
      if (name.length === 0) {
        m.push("タイトルを入力して下さい")
        return
      }
      work.name = name
      console.log(work)
      const { OK, Query } = await api(url.updateWork, work)
      if (!OK) {
        m.push(Query)
        return
      }
      work = Query as Work
    }

    if (isAddSchedule) {
      console.log("3333333333333333333333333333")
      if (sUrl.length === 0) {
        m.push("配信サービス上の作品URLを入力して下さい")
        return
      }

      const { OK, Query } = await api(
        url.addSchedule,
        newSchedule({
          dayOfWeek: dayOfWeek,
          url: sUrl,
          userId: userId,
          workId: work.id,
          serviceId: serviceId,
        })
      )

      if (!OK) {
        m.push(Query)
        return
      }
    }

    console.log("4444444444444444444444444444444")
    if (m.length === 0) {
      set(["データを更新しました"], true)
      this.props.closeEditer()
    } else {
      set(m)
    }
  }

  render() {
    const {
      selects: { dayOfWeek, serviceId },
      texts: { name, wUrl, sUrl },
      isAddSchedule,
    } = this.state
    const { handleClick, handleChange, handleSelectChange, save } = this
    return (
      <Wrapper>
        <WorkAria>
          <Icon i={I.Close} />
          <Title>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={(e) => handleChange(e)}
              placeholder="作品名を入力して下さい"
            />
            <C>
              {({ set, user }) => (
                <style.SC.Button blue onClick={() => save(set, user.id)}>
                  保存
                </style.SC.Button>
              )}
            </C>
            <div>
              作品公式HP：
              <a
                href={`http://${wUrl}`}
                rel="noopener noreferrer"
                target="_blank">
                {wUrl}
              </a>
            </div>
          </Title>
        </WorkAria>
        <ScheduleArea>
          <Hover onClick={handleClick}>
            <Icon i={isAddSchedule ? I.Close : I.Add} />
          </Hover>
          <Span>{isAddSchedule ? "キャンセル" : "スケジュールを追加"}</Span>
          {isAddSchedule ? (
            <AddSchedule>
              <div>
                <div>曜日</div>
                <select
                  name="dayOfWeek"
                  value={dayOfWeek}
                  onChange={handleSelectChange}>
                  <option value={1}>月曜日</option>
                  <option value={2}>火曜日</option>
                  <option value={3}>水曜日</option>
                  <option value={4}>木曜日</option>
                  <option value={5}>金曜日</option>
                  <option value={6}>土曜日</option>
                  <option value={0}>日曜日</option>
                </select>
              </div>
              <div>
                <div>配信サービス</div>
                <C>
                  {({ svs }) => (
                    <select
                      name="serviceId"
                      value={serviceId}
                      onChange={handleSelectChange}>
                      {makeServiceOptions(svs)}
                    </select>
                  )}
                </C>
              </div>
              <Input
                type="text"
                name="sUrl"
                value={sUrl}
                placeholder="配信サービス上の作品URL"
                onChange={(e) => handleChange(e)}
              />
            </AddSchedule>
          ) : null}
        </ScheduleArea>
      </Wrapper>
    )
  }
}

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

const ScheduleArea = styled.div`
  width: 60vw;
  height: 100%;
  padding: 10px 10px 10px 30px;
  ${style.Props.Border("right")};
`

const AddSchedule = styled.div`
  display: flex;
`

const Span = styled.span`
  padding-left: 10px;
`

const Hover = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 50%;

  transition: background-color 100ms linear;

  &:hover {
    background-color: ${style.Color.BGDarkGray};
  }

  img {
    height: 1rem;
  }
`

const Title = styled.div`
  margin-left: 30px;

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
// input {
//   width: 50vw;
//   height: 2.5rem;
//   background-color: ${style.Color.BGGray};
//   border: none;
//   font-size: 1.2rem;
//   outline: 0;
// }

const Input = styled.input`
  width: 50vw;
  height: 2.5rem;
  background-color: ${style.Color.BGGray};
  border: none;
  font-size: 1.2rem;
  outline: 0;
`
