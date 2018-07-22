import * as React from 'react'
import styled from 'styled-components'
import Icon, { IN } from './icon/Icon'
import styles from '../helpers/styles'

export default (): JSX.Element => (
  <FlexWrappar>
    <LeftFlexContainer>
      <div>
        <Icon i={IN.Menu} />
      </div>
      <Icon i={IN.Logo} />
      <span>アニメ ストリーミング カレンダー</span>
    </LeftFlexContainer>
    <RightFlexContainer>
      <Icon i={IN.Search} />
      <span>？</span>
      <span>Logout</span>
    </RightFlexContainer>
  </FlexWrappar>
)

const FlexWrappar = styled.header`
  grid-area: Header;
  height: ${styles.Sizes.HeaderHeight};
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 8px;

  color: ${styles.Colors.FontLight};
  ${styles.Props.Border('bottom')};
`

const LeftFlexContainer = styled.div`
  min-width: 480px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    transition: background-color 100ms linear;

    &:hover {
      background-color: ${styles.Colors.BGDarkGray};
    }

    img[alt^='Menu'] {
      height: 0.8rem;
    }
  }

  img[alt^='Logo'] {
    height: 2rem;
  }

  span {
    font-size: 1.4rem;
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

  img {
    height: 1.2rem;
  }
`
