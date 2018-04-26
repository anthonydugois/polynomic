import { default as React, Component } from "react";
import styled from "styled-components";

const Svg = styled.svg.attrs({
  xmlns: "http://www.w3.org/2000/svg",
})`
  display: block;
  height: 1em;
  width: auto;
  fill: currentColor;
`;

class SvgIcon extends Component {
  render() {
    const { children } = this.props;

    return <Svg viewBox="0 0 24 24">{children}</Svg>;
  }
}

export const SvgIconClear = () => (
  <SvgIcon>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </SvgIcon>
);

export default SvgIcon;
