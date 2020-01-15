import React, { Component } from "react";
import {
  Box,
  Button,
  TextInput,
  RangeInput,
  Heading,
  Grid,
  Stack
} from "grommet";
import { Formik, Form, Field, useField } from "formik";
import styled from "styled-components";
import _ from "lodash";

import Clipboard from "./Clipboard";
import Chef from "./Chef";
import waitList from "./state/waitList.store";
import Clear from "./icons/Clear";
import Process from "./icons/Process";
import Processor from "./Processor";
import Ok from "./icons/Ok";
import Fail from "./icons/Fail";

const ClipText = styled.div`
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 3px;
  width: 230px;
  word-break: break-all;
  overflow-y: auto;
  overflow-x: hidden;
  background: transparent;
  flex: 1;
`;

const Entry = styled.div`
  margin-bottom: 0.5rem;
  background-color: ${({ item }) => {
    return _.get(item, "checked", "") ? "lime" : "transparent";
  }};
  user-select: none;
  padding-left: 0.5rem;
`;

const Label = styled.div`
  color: darkBlue;
  font-size: 1.5rem !important;
  line-height: 150%;
  font-family: "Patrick Hand", "Comic Sans", "Helvetica", "sans-serif";
  margin-left: 0.5rem;
`;

const ClipboardBack = styled.div`
  background-color: rgb(20, 20, 20);
  border-radius: 1rem 0 0 0.5rem;
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;
`;
const ClipboardPaper = styled.div`
  margin: 1rem;
  margin-right: 0;
  margin-bottom: 2.5rem;
  background-color: rgb(200, 175, 150);
  flex: 1;
`;

const RangeLabel = styled.div`
  flex: 0;
  font-weight: bold;
  padding: 0.5rem 1rem;
  user-select: none;
`;

export default class Display extends Component {
  constructor(p) {
    super(p);
    this.state = { ...waitList.value };
    this.changeSpeed = this.changeSpeed.bind(this);
  }

  componentDidMount() {
    this._sub = waitList.subscribe(
      s => this.setState(s.value),
      err => console.log("error  of waitlist: ", err)
    );
  }

  changeSpeed(e) {
    try {
      waitList.do.setSpeed(Number.parseInt(e.target.value, 10));
    } catch (err) {
      console.log("error changingn speed: ", err);
    }
  }

  componentWillUnmount() {
    this._sub.unsubscribe();
  }

  render() {
    console.log("Display: items:", this.state.items);
    return (
      <Grid
        fill
        columns={["auto", "250px"]}
        rows={["200px", "auto", "200px"]}
        align="stretch"
        areas={[
          { name: "head", start: [0, 0], end: [0, 0] },
          { name: "list", start: [1, 1], end: [1, 1] },
          { name: "chef", start: [1, 2], end: [1, 2] },
          { name: "processor", start: [0, 1], end: [0, 2] }
        ]}
      >
        <Box gridArea="head" direction="column" fill="horizontal" pad="medium">
          <Heading textAlign="center">Getting Bracketed</Heading>
          <Box direction="row" fill="horizontal" justify="stretch">
            <RangeLabel>Speed</RangeLabel>
            <div style={{ flex: 1 }}>
              <RangeInput
                type="range"
                min={0}
                max={2000}
                step={10}
                value={this.state.speed}
                onChange={this.changeSpeed}
              />
            </div>
            <RangeLabel>{this.state.speed}</RangeLabel>
          </Box>
        </Box>
        <Box
          gridArea="processor"
          fill={true}
          justify="stretch"
          alighContent="stretch"
          overflow="hidden"
        >
          <Processor />
        </Box>
        <Stack fill={true} gridArea="list" interactiveChild={1}>
          <ClipboardBack>
            <ClipboardPaper />
          </ClipboardBack>
          <Box fill={true} margin={0}>
            <ClipText>
              {this.state.items.map((item, i) => (
                <Entry
                  item={item}
                  key={item.id}
                  onClick={() => waitList.do.toggleChecked(item)}
                >
                  <Box direction="row" align="start" fill="horizontal">
                    {item.processed ? item.balanced ? <Ok /> : <Fail /> : ""}
                    <Label style={{ flex: 1 }}>{item.label}</Label>
                  </Box>
                </Entry>
              ))}
            </ClipText>
            <Box direction="row" gap="medium" margin="4px" justify="between">
              <Button
                color="lightGreen"
                pad={2}
                icon={<Clear />}
                plain
                label="Clear"
                onClick={waitList.do.clearChecked}
                disabled={!waitList.do.hasChecked() || !!waitList.my.processing}
              />
              <Button
                color="accent-3"
                pad={2}
                icon={<Process />}
                plain
                label="Run"
                onClick={() => waitList.do.process(true)}
                disabled={!waitList.do.hasItems() || !!waitList.my.processing}
              />
            </Box>
          </Box>
          <Clipboard />
        </Stack>
        <Box gridArea="chef">
          <Chef style={{ fontSize: "200px" }} />
        </Box>
      </Grid>
    );
  }
}
