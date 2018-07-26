import styled from "styled-components"

const Props = {
  Border: (side: string): string => {
    return `border-${side}: 0.5px solid #e0e0e0`
  },
}

const Size = {
  HeaderHeight: "64px",
  SidebarWidth: "256px",
}

const Color = {
  FontDrak: "#212121",
  FontNormal: "#757575",
  FontLight: "#9e9e9e",
  BGWhite: "#fff",
  BGGray: "rgba(0,0,0,0.04)",
  BGDarkGray: "#ebebeb",
  Blue: "#3367d6",
}

interface BP {
  blue?: any
}

const SC = {
  Button: styled.span<BP>`
    display: inline-block;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    background-color: ;
    border: 1px solid #c6c6c6;
    background-color: ${(p) => (p.blue ? Color.Blue : "#f8f8f8")};
    color: ${(p) => (p.blue ? Color.BGWhite : Color.FontNormal)};
  `,
}

export default { Props, Size, Color, SC }
