import * as React from "react"
import { Component } from "react"
import styled from "styled-components"
import style from "../util/style"

import { Set, Work } from "../util/type/type"
import User from "../util/type/user"
import { C } from "./App"

import Icon, { I } from "./icon/Icon"
import InputText from "./InputText"

interface APProps {
  url: string
  handleChange: (e: React.FormEvent) => void
  handleClick: (key: string) => void
  next: (set: Set, wks: Work[]) => Promise<any>
  isAddWork: boolean
  selectValue: number
  handleSelectChange: (e: React.FormEvent<HTMLSelectElement>) => void
}

const makeWorkOptions = (wks: Work[]) => {
  return wks.map((wk) => (
    <option key={wk.id} value={wk.id}>
      {wk.name}
    </option>
  ))
}

export default ({
  url,
  handleChange,
  handleClick,
  next,
  isAddWork,
  selectValue,
  handleSelectChange,
}: APProps) => {
  const addForm = (
    <FromWrapper>
      <InputText
        label={"アニメ公式ページURL"}
        name={"url"}
        value={url}
        handleChange={handleChange}
      />
      <p>
        <style.SC.Button
          white
          className="add"
          onClick={() => handleClick("addWork")}>
          作品選択に戻る
        </style.SC.Button>
      </p>
    </FromWrapper>
  )

  const addButtonText = (
    <p>
      追加したいアニメ公式HPのURLを<br />
      ブラウザのアドレスバーからコピーして貼り付けて下さい
    </p>
  )

  const selectForm = (
    <FromWrapper>
      <C>
        {({ wks }) => (
          <div>
            <label>作品を選択 </label>
            <select
              name="serviceId"
              value={selectValue}
              onChange={handleSelectChange}>
              <option value={-1}>作品を選択</option>
              {makeWorkOptions(wks)}
            </select>
          </div>
        )}
      </C>
      <p>
        ご希望の作品がない場合:
        <style.SC.Button
          white
          className="add"
          onClick={() => handleClick("addWork")}>
          作品を追加
        </style.SC.Button>
      </p>
    </FromWrapper>
  )

  const selectButtonText = <p>スケジュールを追加したい作品を選択して下さい</p>

  return (
    <Wrapper>
      <GridContainer>
        <IconWrapper>
          <div onClick={() => handleClick("add")}>
            <Icon i={I.Close} />
          </div>
        </IconWrapper>
        {isAddWork ? addForm : selectForm}
        <ButtonWrapper>
          {isAddWork ? addButtonText : selectButtonText}
          <C>
            {({ set, wks }) => (
              <style.SC.Button blue onClick={() => next(set, wks)}>
                次へ
              </style.SC.Button>
            )}
          </C>
        </ButtonWrapper>
      </GridContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 10;
  top: 0px;
  left: 0px;
`

const GridContainer = styled.div`
  width: 400px;
  height: 250px;
  display: grid;
  grid-template-rows: 12% 43% 45%;
  grid-template-areas:
    "IconWrapper"
    "FromWrapper"
    "ButtonWrapper";

  background-color: ${style.Color.BGWhite};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
`

const IconWrapper = styled.div`
  grid-area: IconWrapper;
  padding-top: 10px;
  padding-left: 10px;

  div {
    display: inline-block;
    cursor: pointer;

    img {
      height: 1.2rem;
      width: 1.2rem;
    }
  }
`

const FromWrapper = styled.div`
  grid-area: FromWrapper;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  align-content: space-around;

  p {
    font-size: 0.7rem;
    .add {
      margin-left: 0.2rem;
      padding: 0.1rem 1rem;
    }
  }
`

const Input = styled.div`
  width: 100%;
  padding: 10px;
  label {
    font-size: 0.7rem;
  }

  input {
    border: none;
    width: 100%;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  div {
    height: 2px;
    background-color: ${style.Color.BGDarkGray};
  }
`

const ButtonWrapper = styled.div`
  grid-area: ButtonWrapper;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 10px;
  background-color: ${style.Color.BGDarkGray};
  p {
    text-align: center;
    font-size: 0.9rem;
    margin: 5px 0;
  }

  span {
    width: 3.5rem;
    padding: 0.2rem;
    text-align: center;
  }
`
