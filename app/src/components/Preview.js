import { default as React, Component } from "react";
import styled from "styled-components";

const Container = styled.svg`
  flex: 1;
  width: 100%;
`;

class Preview extends Component {
  render() {
    const { children, ...rest } = this.props;

    return <Container {...rest}>{children}</Container>;
  }
}

export default Preview;
