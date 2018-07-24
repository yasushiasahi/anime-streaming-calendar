import * as React from "react"
import styled from "styled-components"
import styles from "../helpers/styles"

interface Props {
  name: string
}

export default ({ name }: Props): JSX.Element => (
  <Wrapper>
    <input type="checkBox" name="" value="" />
    <span>{name}</span>
  </Wrapper>
)

const Wrapper = styled.label`
  display: block;
  padding: 5px 21px 5px 16px;
  cursor: pointer;
  user-select: none;
  transition: background-color 100ms linear;

  &:hover {
    background-color: ${styles.Colors.BGGray};
  }

  span {
    padding-left: 20px;
    color: ${styles.Colors.FontDrak};
  }
`
