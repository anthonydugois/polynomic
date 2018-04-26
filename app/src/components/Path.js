import { default as React, Component } from "react";
import styled from "styled-components";

import { map } from "polynomic";

const SvgPath = styled.path`
  fill: none;
  stroke: ${props => props.color};
  stroke-width: 1px;
`;

const SvgCircle = styled.circle`
  fill: ${props => props.color};
  stroke: none;
`;

class Path extends Component {
  static defaultProps = {
    path: "",
    color: "black",
  };

  renderSeg = (seg, index, segs, params) => {
    return (
      <SvgCircle
        key={index}
        r={1}
        cx={params.x3}
        cy={params.y3}
        color={"blue"}
      />
    );
  };

  renderSegs = path => map(this.renderSeg, [], path);

  render() {
    const { path, color } = this.props;

    return (
      <g>
        <SvgPath d={path} color={color} />
        {this.renderSegs(path)}
      </g>
    );
  }
}

export default Path;
