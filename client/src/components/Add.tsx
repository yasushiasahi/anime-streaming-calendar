import * as React from "react"
import { Component } from "react"
import styled from "styled-components"

import { Set, Work, newWork } from "../util/type/type"
import { api, url } from "../util/axios"

import FAB from "./FAB"
import AddPre from "./AddPre"
import WorkEditer from "./WorkEditer"
import { log } from "util"

interface Texts {
  url: string
  name: string
  [key: string]: string
}

interface IsShown {
  add: boolean
  edit: boolean
  [key: string]: boolean
}

interface AState {
  isShown: IsShown
  texts: Texts
  work: Work
}

export default class Add extends Component {
  state = {
    isShown: {
      add: false,
      edit: false,
    },
    texts: { url: "", name: "" },
    work: {
      id: 0,
      name: "",
      url: "",
      onair: false,
      userId: 0,
    },
  }

  handleClick = (key: string) => {
    const copyIsShown: IsShown = Object.assign({}, this.state.isShown)
    copyIsShown[key] = !copyIsShown[key]
    this.setState({ isShown: copyIsShown })
  }

  closeEditer = () => {
    this.setState({ isShown: { add: false, edit: false } })
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const copyTexts: Texts = Object.assign({}, this.state.texts)
    copyTexts[e.currentTarget.name] = e.currentTarget.value
    this.setState({ texts: copyTexts })
  }

  next = async (set: Set) => {
    const wUrl = this.state.texts.url
    if (wUrl.length === 0) {
      set(["入力が空です"])
      return
    }
    const result = wUrl.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]
    if (result === null) {
      set([
        "入力が不正です。ブラウザのアドレスバーからコピーして貼り付けて下さい",
      ])
      return
    }
    const { OK, Query } = await api(url.getWork, newWork({ url: result }))
    if (OK) {
      this.setState({
        isShown: { add: false, edit: true },
        work: Query as Work,
      })
      set([`${Query.name}はすでに登録済みです`])
      return
    }

    this.setState({
      isShown: { add: false, edit: true },
      texts: { url: result, title: "" },
      work: newWork({ url: result }),
    })
  }

  render() {
    const { isShown, texts, work } = this.state
    const { handleChange, closeEditer, handleClick, next } = this

    return (
      <div>
        <FAB handleClick={handleClick} />
        {isShown.add ? (
          <AddPre
            url={texts.url}
            handleChange={handleChange}
            handleClick={handleClick}
            next={next}
          />
        ) : null}
        {isShown.edit ? (
          <WorkEditer work={work} closeEditer={closeEditer} />
        ) : null}
      </div>
    )
  }
}
