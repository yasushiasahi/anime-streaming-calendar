import * as React from "react"
import { Component } from "react"
import styled from "styled-components"

import { Set, newWork } from "../util/type/type"
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
}

export default class Add extends Component {
  state = {
    isShown: {
      add: false,
      edit: false,
    },
    texts: { url: "", name: "" },
  }

  handleClick = (key: string) => {
    const copyIsShown: IsShown = Object.assign({}, this.state.isShown)
    copyIsShown[key] = !copyIsShown[key]
    this.setState({ isShown: copyIsShown })
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
      set([`${Query.name}はすでに登録済みです`])
      return
    }

    this.setState({
      isShown: { add: false, edit: true },
      texts: { url: result, title: "" },
    })
  }

  save = async (set: Set) => {
    const { name, url: wUrl } = this.state.texts
    if (name.length === 0) {
      set(["タイトルを入力して下さい"])
      return
    }

    const { OK, Query } = await api(
      url.addWork,
      newWork({ name: name, url: wUrl })
    )
    if (!OK) {
      set([Query])
      return
    }

    this.setState({
      isShown: { add: false, edit: false },
      texts: { url: "", name: "" },
    })

    set([`${name}を保存しました`], true)
  }

  render() {
    const { isShown, texts } = this.state
    const { handleChange, handleClick, next, save } = this
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
          <WorkEditer
            name={texts.name}
            url={texts.url}
            handleChange={handleChange}
            save={save}
          />
        ) : null}
      </div>
    )
  }
}
