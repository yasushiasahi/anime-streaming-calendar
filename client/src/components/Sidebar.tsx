import * as React from 'react'
import styled from 'styled-components'
import MenuTitle from './MenuTitle'
import CheckBox from './CheckBox'
import styles from '../helpers/styles'
import { log } from 'util'

const SearviseDatas = [
  { id: 1, name: 'Netflix' },
  { id: 2, name: 'Amazonプライム' },
  { id: 3, name: 'ｄアニメストア' }
]
const MyListDatas = [
  { id: 1, name: '2018冬' },
  { id: 2, name: '2018春' },
  { id: 3, name: '2018夏' }
]

interface IsOpens {
  Services: boolean
  MyLists: boolean
  [key: string]: boolean
}

interface State {
  isOpens: IsOpens
}

interface CheckBoxDatas {
  id: number
  name: string
}

const makeCheckBoxs = (ds: CheckBoxDatas[]): JSX.Element[] => {
  return ds.map(d => <CheckBox key={d.id} name={d.name} />)
}

export default class Sidebar extends React.Component<{}, State> {
  state = {
    isOpens: { Services: true, MyLists: true }
  }

  handleClick = (key: string): void => {
    const copyIsOpens: IsOpens = Object.assign({}, this.state.isOpens)
    copyIsOpens[key] = !copyIsOpens[key]
    this.setState({
      isOpens: copyIsOpens
    })
  }

  render() {
    const { isOpens } = this.state
    const { handleClick } = this

    return (
      <Container>
        <MenuTitle title={'Services'} isOpen={isOpens.Services} handleClick={handleClick} />
        <CheckBoxWrappar isOpen={isOpens.Services}>{makeCheckBoxs(SearviseDatas)}</CheckBoxWrappar>
        <Divider />
        <MenuTitle title={'MyLists'} isOpen={isOpens.MyLists} handleClick={handleClick} />
        <CheckBoxWrappar isOpen={isOpens.MyLists}>{makeCheckBoxs(MyListDatas)}</CheckBoxWrappar>
      </Container>
    )
  }
}

const Container = styled.aside`
  grid-area: Sidebar;
  box-sizing: border-box;
  min-height: calc(100vh - ${styles.Sizes.HeaderHeight});
  ${styles.Props.Border('right')};
`

const Divider = styled.div`
  height: 0;
  margin: 8px 0;
  ${styles.Props.Border('bottom')};
`

interface CBWProps {
  isOpen: boolean
}

const CheckBoxWrappar = styled.div<CBWProps>`
  display: ${p => (p.isOpen ? 'block' : 'none')};
`
