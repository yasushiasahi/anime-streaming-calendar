import * as React from 'react'
import styled from 'styled-components'
import styles from '../helpers/styles'
import UnderPict from './UnderPict'

interface Props {
  title: string
  isOpen: boolean
  handleClick: (key: string) => void
}

const MenuTitle = ({ title, isOpen, handleClick }: Props): JSX.Element => (
  <Wrapper onClick={() => handleClick(title)}>
    <div>
      <p>{title}</p>
      <UnderPict isOpen={isOpen} />
    </div>
  </Wrapper>
)

const Wrapper = styled.div`
  padding: 5px 21px 5px 16px;
  cursor: pointer;
  user-select: none;
  transition: background-color 100ms linear;

  &:hover {
    background-color: #ebebeb;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      margin: 0;
    }

    svg {
      height: 0.5rem;
    }
  }
`

export default MenuTitle
