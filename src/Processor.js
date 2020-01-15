import { Box, Button, TextInput } from "grommet";
import React, { Component } from "react";
import { Formik, Form, Field, useField } from "formik";
import _ from "lodash";
import { withSize } from "react-sizeme";
import styled from "styled-components";

import waitList from "./state/waitList.store";
import processorFactory from "./state/processorFactory";
import Stack from "./Stack";

const Frame = styled.section``;

export default withSize({ monitorWidth: true, monitorHeight: true })(
  class Processor extends Component {
    constructor(p) {
      super(p);
      this.processor = processorFactory();
      this.state = { ...this.processor.value };
    }

    componentDidMount() {
      this._sub = this.processor.subscribe(
        ({ value }) => this.setState(value),
        error => console.log("processing error: ", error)
      );
    }

    render() {
      return (
        <Frame>
          <Stack stack={this.state.stack} />
        </Frame>
      );
    }
  }
);
