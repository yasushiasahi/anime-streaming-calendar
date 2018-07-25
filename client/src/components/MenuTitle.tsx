import * as React from "react"
import styled from "styled-components"
import styles from "../helpers/styles"
import Icon, { I } from "./icon/Icon"

interface Props {
  title: string
  isOpen: boolean
  handleClick: (key: string) => void
}

export default ({ title, isOpen, handleClick }: Props): JSX.Element => (
  <Wrapper onClick={() => handleClick(title)}>
    <div>
      <p>{title}</p>
      {isOpen ? <Icon i={I.Up} /> : <Icon i={I.Down} />}
    </div>
  </Wrapper>
)

const Wrapper = styled.div`
  padding: 5px 21px 5px 16px;
  cursor: pointer;
  user-select: none;
  transition: background-color 100ms linear;

  &:hover {
    background-color: ${styles.Colors.BGDarkGray};
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      margin: 0;
    }

    img {
      height: 0.5rem;
    }
  }
`
