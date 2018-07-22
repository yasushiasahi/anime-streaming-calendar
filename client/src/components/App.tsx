import * as React from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'
import Header from './Header'
import Sidebar from './Sidebar'
import Calendar from './Calendar'
import styles from '../helpers/styles'

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
