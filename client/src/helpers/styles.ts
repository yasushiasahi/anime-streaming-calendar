import styled from 'styled-components'

const Props = {
  Border: (side: string): string => {
    return `border-${side}: 0.5px solid #e0e0e0`
  }
}

const Sizes = {
  HeaderHeight: '64px',
  SidebarWidth: '256px'
}

const Colors = {
  FontDrak: '#212121',
  FontNormal: '#757575',
  FontLight: '#9e9e9e'
}

const SCs = {
  Svg: styled.svg`
    height: 100%;
  `
}

export default { Props, Sizes, Colors, SCs }
