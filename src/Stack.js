import React, { Component } from "react";
import { Box, Button, TextInput, Heading, Grid } from "grommet";
import { Formik, Form, Field, useField } from "formik";
import styled from "styled-components";
import _ from "lodash";
import { readdirSync } from "fs";

const Frame = styled.section`
  display: flex;
  direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Cell = styled.section`
  height: 80px;
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem !important;
  line-height: 150%;
  font-family: "Patrick Hand", "Comic Sans", "Helvetica", "sans-serif";
  font-weight: ${({ tag }) => (tag ? "bold" : "normal")};
  color: ${({ color }) => color || "white"};
`;

export default class Stack extends Component {
  constructor(p) {
    super(p);
  }

  render() {
    const { stack } = this.props;
    if (!Array.isArray(stack)) {
      return <Frame>(empty)</Frame>;
    }
    return (
      <Frame>
        {stack.map(c => (
          <Cell key={c.id} color={c.color} tag={c.tag} id={c}>
            <span>{c.value}</span>
          </Cell>
        ))}
      </Frame>
    );
  }
}
