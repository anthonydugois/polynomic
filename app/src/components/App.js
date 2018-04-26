import { default as React, Component } from "react";
import styled from "styled-components";

import PathInput from "./PathInput";
import Path from "./Path";
import Editor from "./Editor";
import Preview from "./Preview";
import Button from "./Button";

import * as Px from "polynomic";

global.Px = Px;

const Container = styled.div`
  display: grid;
  grid-template-columns: 15% 42.5% 42.5%;
  grid-template-rows: 100vh;
  grid-template-areas: "a b c";
`;

const Pane = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  grid-area: ${props => props.area};
  background: ${props =>
    props.dark ? props.theme.colors.black.prim : props.theme.colors.white.prim};
  color: ${props =>
    props.dark ? props.theme.colors.white.prim : props.theme.colors.black.prim};
`;

const Coords = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const PathInputListWrapper = styled.div`
  flex: 1;
  overflow: auto;
`;

const PathInputList = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const EditorWrapper = styled.div`
  padding: 1rem 0.6rem 1rem 0;
`;

const Actions = styled.div`
  display: flex;
  padding: 0.8rem;
`;

const AddButton = styled(Button)`
  cursor: pointer;
  padding: 0.75rem;
  background: ${props => props.theme.colors.blue.prim};
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.05rem;
  color: ${props => props.theme.colors.black.prim};
`;

const RunButton = styled(Button)`
  cursor: pointer;
  padding: 0.75rem 1rem;
  background: ${props => props.theme.colors.blue.prim};
  border-radius: 2px;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.05rem;
  color: ${props => props.theme.colors.black.prim};
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.id = 0;
  }

  state = localStorage.getItem("state")
    ? JSON.parse(localStorage.getItem("state"))
    : {
        paths: {},
        content: ``,
        x: 0,
        y: 0,
      };

  componentWillUpdate(_, nextState) {
    if (
      this.state.paths !== nextState.paths ||
      this.state.content !== nextState.content
    ) {
      localStorage.setItem("state", JSON.stringify(nextState));
    }
  }

  exec() {
    const { paths, content } = this.state;
    const keys = Object.keys(paths);

    keys.forEach(key => {
      global["$" + key] = paths[key];
    });

    try {
      // eslint-disable-next-line
      eval(content);
      this.forceUpdate();
    } catch (err) {
      console.error(err);
    }
  }

  handlePathInputBlur = key => evt => {
    const { value } = evt.target;

    this.setState(state => ({
      paths: Object.keys(state.paths).reduce((acc, _key) => {
        acc[_key] = _key === key ? value : state.paths[_key];

        return acc;
      }, {}),
    }));
  };

  handleContentChange = value => {
    this.setState(state => ({
      content: value,
    }));
  };

  handleRunClick = evt => {
    evt.preventDefault();
    this.exec();
  };

  handlePathInputAddClick = evt => {
    evt.preventDefault();

    this.setState(state => ({
      paths: { ...state.paths, [this.id++]: "" },
    }));
  };

  handlePathInputRemoveClick = key => evt => {
    evt.preventDefault();

    this.setState(
      state => ({
        paths: Object.keys(state.paths).reduce((acc, _key) => {
          if (_key !== key) {
            acc[_key] = state.paths[_key];
          }

          return acc;
        }, {}),
      }),
      () => {
        this.exec();
      },
    );
  };

  handlePreviewMouseMove = evt => {
    const { top, left } = this.node.getBoundingClientRect();
    const x = Math.round(evt.clientX - left);
    const y = Math.round(evt.clientY - top);

    this.setState({ x, y });
  };

  renderPathInput = key => {
    const path = this.state.paths[key];

    return (
      <PathInput
        key={key}
        name={key}
        path={path}
        onRemoveClick={this.handlePathInputRemoveClick(key)}
        onBlur={this.handlePathInputBlur(key)}
      />
    );
  };

  renderPath = key => {
    const path = this.state.paths[key];

    return <Path key={key} path={path} />;
  };

  renderOutput = (path, index) => {
    return <Path key={index} path={path} color={"red"} />;
  };

  render() {
    const { paths, content } = this.state;
    const keys = Object.keys(paths);
    const outputs = keys.map(key => global["$" + key]);

    return (
      <Container>
        <Pane area="a">
          <AddButton onClick={this.handlePathInputAddClick}>New path</AddButton>
          <PathInputListWrapper>
            <PathInputList>{keys.map(this.renderPathInput)}</PathInputList>
          </PathInputListWrapper>
        </Pane>

        <Pane area="b" dark={true}>
          <Actions>
            <RunButton onClick={this.handleRunClick}>Run</RunButton>
          </Actions>

          <EditorWrapper>
            <Editor value={content} onChange={this.handleContentChange} />
          </EditorWrapper>
        </Pane>

        <Pane area="c">
          <Coords>
            {this.state.x},{this.state.y}
          </Coords>
          <Preview
            innerRef={node => (this.node = node)}
            onMouseMove={this.handlePreviewMouseMove}
          >
            {keys.map(this.renderPath)}
            {outputs.map(this.renderOutput)}
          </Preview>
        </Pane>
      </Container>
    );
  }
}

export default App;
