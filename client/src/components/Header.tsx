import * as React from 'react'
import styled from 'styled-components'
import HamburgerPict from './HamburgerPict'
import SearchPict from './SearchPict'

class Header extends React.Component {
  render() {
    return (
      <Container>
        <HamburgerPict />
        <span>Anime Streaming Calendar</span>
        <input type="text" name="search" value="" />
        <SearchPict />
        <span>ログアウト</span>
      </Container>
    )
  }
}

const Container = styled.header`
  grid-area: Header;

  display: flex;
  align-items: center;

  height: 64px;
  padding: 8px;
  box-sizing: border-box;

  border-bottom: 0.5px solid lightgrey;

  svg {
    height: 40%;
  }
`

export default Header
