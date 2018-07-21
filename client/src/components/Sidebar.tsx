import * as React from 'react'
import styled from 'styled-components'
import UnderPict from './UnderPict'

class Sidebar extends React.Component {
  render() {
    return (
      <Container>
        <FlexContainer>
          <div>配信サービス</div>
          <UnderPict />
        </FlexContainer>
      </Container>
    )
  }
}

const Container = styled.aside`
  grid-area: Sidebar;

  background-color: lime;
  border-right: 0.5px solid lightgrey;
`

const FlexContainer = styled.div`
  display: flex;
justify-content: space-between;

svg {
    height: 1rem;
}
`

export default Sidebar
