import { default as React, Component } from "react";
import styled from "styled-components";

import Button from "./Button";
import { SvgIconClear } from "./SvgIcon";

const Container = styled.div`
  position: relative;
  height: 5rem;
  background: ${props => props.theme.colors.white.prim};
  border-bottom: 1px solid ${props => props.theme.colors.white.sec};
`;

const RemoveButton = styled(Button)`
  position: absolute;
  top: 0.65rem;
  right: 0.5rem;
  z-index: 5;
  padding: 0.1rem;
  background: inherit;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.white.quat};

  &:hover,
  &:focus {
    color: ${props => props.theme.colors.black.quat};
  }

  ${Container}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  width: 2.75rem;
  padding: 0.6rem;
  line-height: 1.6;
  font-family: "Roboto Mono", monospace;
  font-size: 0.7rem;
  color: ${props => props.theme.colors.black.quat};
`;

const Textarea = styled.textarea.attrs({
  spellCheck: false,
})`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0.6rem;
  background: ${props => props.theme.colors.white.prim};
  border: none;
  resize: none;
  text-indent: 1.85rem;
  line-height: 1.6;
  font-family: "Roboto Mono", monospace;
  font-size: 0.7rem;
  color: ${props => props.theme.colors.black.prim};

  &:focus ~ ${RemoveButton} {
    opacity: 0;
    visibility: hidden;
  }
`;

class PathInput extends Component {
  render() {
    const { name, path, onRemoveClick, onBlur } = this.props;

    return (
      <Container>
        <Label for={name}>${name}:</Label>
        <Textarea id={name} defaultValue={path} onBlur={onBlur} />

        <RemoveButton onClick={onRemoveClick}>
          <SvgIconClear />
        </RemoveButton>
      </Container>
    );
  }
}

export default PathInput;
