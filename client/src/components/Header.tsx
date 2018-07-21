import * as React from 'react'
import styled from 'styled-components'
import HamburgerPict from './HamburgerPict'
import SearchPict from './SearchPict'
import LogoPict from './LogoPict'
import styles from '../helpers/styles'

class Header extends React.Component {
  render() {
    return (
      <FlexWrappar>
        <LeftFlexContainer>
          <HamburgerPict />
          <LogoPict />
          <span>ANIME STREAMING CALENDAR</span>
        </LeftFlexContainer>
        <RightFlexContainer>
          <SearchPict />
          <span>？</span>
          <span>Logout</span>
        </RightFlexContainer>
      </FlexWrappar>
    )
  }
}

const FlexWrappar = styled.header`
  grid-area: Header;
  height: ${styles.Sizes.HeaderHeight};
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 8px;

  ${styles.Props.Border('bottom')};
`

const LeftFlexContainer = styled.div`
  min-width: 450px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  span {
    font-size: 1.4rem;
  }

  svg:nth-of-type(1) {
    height: 1rem;
  }
  svg:nth-of-type(2) {
    height: 2.2rem;
  }
`

const RightFlexContainer = styled.div`
  min-width: 150px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  span:nth-of-type(1) {
    font-size: 1.5rem;
  }

  svg:nth-of-type(1) {
    height: 1.3rem;
  }
`

export default Header
