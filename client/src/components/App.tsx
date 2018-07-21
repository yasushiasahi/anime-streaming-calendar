import * as React from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'
import Header from './Header'
import Sidebar from './Sidebar'

const App = () => (
  <GridContainer>
    <Header />
    <Sidebar />
  </GridContainer>
)

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 256px repeat(7, 1fr);
  grid-template-rows: 64px auto;
  grid-template-areas:
    'Header Header Header Header Header Header Header Header'
    'Sidebar . . . . . . .';
`

export default hot(module)(App)
