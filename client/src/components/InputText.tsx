import * as React from "react"
import styled from "styled-components"
import styles from "../helpers/styles"

interface ITProps {
  label: string
  type?: string
  name: string
  value: string
  handleChange: (e: React.FormEvent) => void
}

export default ({ label, type = "text", name, value, handleChange }: ITProps) => (
  <Wrapper>
    <label>{label}</label>
    <br />
    <input type={type} name={name} value={value} onChange={e => handleChange(e)} />
    <div />
  </Wrapper>
)

const Wrapper = styled.div`
  width: 100%;

  input {
    border: none;
    width: 100%;
    font-size:1rem;
    line-height: 1.5rem;
  }

  div {
    width: 100%;
    height: 2px;
    background-color: ${styles.Colors.BGDarkGray};
  }
`
