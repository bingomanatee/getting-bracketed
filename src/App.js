import React from "react";
import "./styles.css";
import { Grommet, Box, Button, Heading, Footer, Main } from "grommet";
import theme from "./grommet-theme.json";
import EntryForm from "./EntryForm";
import Chef from "./Chef";
import Display from "./Display";
export default function App() {
  return (
    <Grommet theme={theme} full>
      <Box align="center" background="neutral-2" direction="column" fill={true}>
        <Display />
        <Footer pad="small" justify="stretch" fill="horizontal">
          <EntryForm />
        </Footer>
      </Box>
    </Grommet>
  );
}
