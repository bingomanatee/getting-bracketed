import { Box, Button, TextInput } from "grommet";
import React, { Component } from "react";
import { Formik, Form, Field, useField } from "formik";
import _ from "lodash";

import waitList from "./state/waitList.store";

export default class EntryForm extends Component {
  constructor(p) {
    super(p);
    this.state = {
      initial: { bracketText: "" }
    };
  }
  render() {
    return (
      <Formik
        initialValues={this.state.initial}
        validate={values => {
          const e = {};
          if (!_.get(values, "bracketText")) {
            e.bracketText = "required";
          }
          return e;
        }}
        onSubmit={({ bracketText }, { setSubmitting, resetForm }) => {
          if (bracketText) {
            console.log("adding ", bracketText);
            waitList.do.addItem(bracketText);
          }
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ flex: 1 }}>
            <Box direction="row" justify="stretch" fill="horizontal">
              <Field name="bracketText">
                {({ field, meta, form: { touched, errors } }) => (
                  <TextInput {...field} />
                )}
              </Field>
              <Button
                plain={false}
                type="submit"
                disabled={isSubmitting}
                primary
              >
                Add to List
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    );
  }
}
