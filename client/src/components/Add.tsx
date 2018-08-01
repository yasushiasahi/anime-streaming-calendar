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
  selectValue: number
}

export default class Add extends Component {
  state = {
    isShown: {
      add: false,
      edit: false,
      addWork: false,
    },
    texts: { url: "", name: "" },
    work: {
      id: 0,
      name: "",
      url: "",
      onair: false,
      userId: 0,
    },
    selectValue: -1,
  }

  handleClick = (key: string) => {
    const copyIsShown: IsShown = Object.assign({}, this.state.isShown)
    copyIsShown[key] = !copyIsShown[key]
    this.setState({ isShown: copyIsShown })
  }

  handleSelectChange = (e: React.FormEvent<HTMLSelectElement>): void => {
    this.setState({ selectValue: parseInt(e.currentTarget.value) })
  }

  closeEditer = () => {
    this.setState({ isShown: { add: false, edit: false } })
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const copyTexts: Texts = Object.assign({}, this.state.texts)
    copyTexts[e.currentTarget.name] = e.currentTarget.value
    this.setState({ texts: copyTexts })
  }

  next = async (set: Set, wks: Work[]) => {
    if (this.state.isShown.addWork) {
      this.nextNewWork(set)
    } else {
      this.nextSelectedWork(set, wks)
    }
  }

  nextNewWork = async (set: Set) => {
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

  nextSelectedWork = (set: Set, wks: Work[]) => {
    const selectValue = this.state.selectValue
    if (selectValue === -1) {
      set(["作品が選択されていません"])
      return
    }

    const work = wks.find((wk) => wk.id === selectValue)

    this.setState({
      isShown: { add: false, edit: true },
      texts: { url: "", title: "" },
      selectValue: -1,
      work: work,
    })
  }

  render() {
    const { isShown, texts, work, selectValue } = this.state
    const {
      handleChange,
      closeEditer,
      handleClick,
      next,
      handleSelectChange,
    } = this

    return (
      <div>
        <FAB handleClick={handleClick} />
        {isShown.add ? (
          <AddPre
            url={texts.url}
            handleChange={handleChange}
            handleClick={handleClick}
            next={next}
            isAddWork={isShown.addWork}
            selectValue={selectValue}
            handleSelectChange={handleSelectChange}
          />
        ) : null}
        {isShown.edit ? (
          <WorkEditer work={work} closeEditer={closeEditer} />
        ) : null}
      </div>
    )
  }
}
