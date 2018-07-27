import * as React from "react"
import styled from "styled-components"
import { log } from "util"
import style from "../util/style"
import CheckBox from "./CheckBox"
import MenuTitle from "./MenuTitle"
import { Service } from "../util/type/type"

const SearviseDatas = [
  { id: 1, name: "Netflix" },
  { id: 2, name: "Amazonプライム" },
  { id: 3, name: "ｄアニメストア" },
]
const MyListDatas = [
  { id: 1, name: "2018冬" },
  { id: 2, name: "2018春" },
  { id: 3, name: "2018夏" },
]

interface IsOpens {
  Services: boolean
  MyLists: boolean
  [key: string]: boolean
}

interface State {
  isOpens: IsOpens
}

interface SProps {
  ser: Service[]
  handleSerClick: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void
}

interface CheckBoxDatas {
  id: number
  name: string
}

export default class Sidebar extends React.Component<
  SProps,
  State,
  JSX.Element
  > {
  constructor(props: SProps) {
    super(props)
    this.state = {
      isOpens: { Services: true, MyLists: true },
    }
  }

  handleClick = (key: string): void => {
    const copyIsOpens: IsOpens = Object.assign({}, this.state.isOpens)
    copyIsOpens[key] = !copyIsOpens[key]
    this.setState({
      isOpens: copyIsOpens,
    })
  }

  render() {
    const isOpens = this.state.isOpens
    const { ser, handleSerClick } = this.props
    const handleClick = this.handleClick

    const serBoxs = ser.map((s) => (
      <CheckBox key={s.id} s={s} handleSerClick={handleSerClick} />
    ))

    return (
      <Container>
        <MenuTitle
          title={"Services"}
          isOpen={isOpens.Services}
          handleClick={handleClick}
        />
        <CheckBoxWrappar isOpen={isOpens.Services}>{serBoxs}</CheckBoxWrappar>
        <Divider />

        {/*
           <MenuTitle
          title={"MyLists"}
          isOpen={isOpens.MyLists}
          handleClick={handleClick}
        />
          <CheckBoxWrappar isOpen={isOpens.MyLists}>
            {makeCheckBoxs(MyListDatas)}
          </CheckBoxWrappar>
        */}
      </Container>
    )
  }
}

const Container = styled.aside`
  grid-area: Sidebar;
  box-sizing: border-box;
  min-height: calc(100vh - ${style.Size.HeaderHeight});
  ${style.Props.Border("right")};
`

const Divider = styled.div`
  height: 0;
  margin: 8px 0;
  ${style.Props.Border("bottom")};
`

interface CBWProps {
  isOpen: boolean
}

const CheckBoxWrappar = styled.div<CBWProps>`
  display: ${(p) => (p.isOpen ? "block" : "none")};
`
