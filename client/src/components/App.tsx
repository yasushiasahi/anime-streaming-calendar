import * as React from "react"
import { hot } from "react-hot-loader"
import styled from "styled-components"
import styles from "../helpers/styles"
import Calendar from "./Calendar"
import Header from "./Header"
import Sidebar from "./Sidebar"

const App = (): JSX.Element => (
  <GridContainer>
    <Header />
    <Sidebar />
    <Calendar />
  </GridContainer>
)

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${styles.Sizes.SidebarWidth} auto;
  grid-template-rows: ${styles.Sizes.HeaderHeight} auto;
  grid-template-areas:
    'Header   Header'
    'Sidebar  Calendar';
`

export default hot(module)(App)
