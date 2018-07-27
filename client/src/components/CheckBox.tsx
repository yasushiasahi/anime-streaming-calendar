import * as React from "react"
import styled from "styled-components"
import styles from "../util/style"
import Logo from "./icon/Logo"
import { Service } from "../util/type/type"

interface Props {
  s: Service
  handleSerClick: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void
}

export default ({ s, handleSerClick }: Props): JSX.Element => (
  <Wrapper>
    <input
      checked={s.flag}
      type="checkBox"
      onChange={(e) => handleSerClick(e, s.id)}
    />
    <div>
      <Logo i={s.id} />
      <span>{s.name}</span>
    </div>
  </Wrapper>
)

const Wrapper = styled.label`
  display: flex;
  align-items: center;
  padding: 5px 21px 5px 16px;
  cursor: pointer;
  user-select: none;
  transition: background-color 100ms linear;

  &:hover {
    background-color: ${styles.Color.BGGray};
  }

  input {
    margin-right: 1rem;
    height: 0.8rem;
    display: block;
  }

  img {
    width: 1rem;
    height: 1rem;
    margin-right: 0.3rem;
  }

  span {
    color: ${styles.Color.FontDrak};
  }
`
