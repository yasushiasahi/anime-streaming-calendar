import * as React from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'
import Header from './Header'
import Sidebar from './Sidebar'
import styles from '../helpers/styles'

const App = () => (
  <GridContainer>
    <Header />
    <Sidebar />
  </GridContainer>
)

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${styles.Sizes.SidebarWidth} repeat(7, 1fr);
  grid-template-rows: ${styles.Sizes.HeaderHeight} auto;
  grid-template-areas:
    'Header Header Header Header Header Header Header Header'
    'Sidebar . . . . . . .';
`

export default hot(module)(App)
