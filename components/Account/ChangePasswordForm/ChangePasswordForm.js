import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { updatePasswordApi } from "../../../api/user";

export default function ChangePasswordForm({ user, logout }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) =>
      handleChangePasswordForm(formData, setLoading, user, logout),
  });

  return (
    <div className="change-password-form">
      <h4>Change your password</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="password"
            type="password"
            placeholder="Your new password"
            onChange={formik.handleChange}
            values={formik.values.password}
            error={formik.errors.password}
          />
          <Form.Input
            name="repeatPassword"
            type="password"
            placeholder="Confirm your new password"
            onChange={formik.handleChange}
            values={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          Save Changes
        </Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string()
      .required(true)
      .oneOf([Yup.ref("repeatPassword")], true),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true),
  };
}

async function handleChangePasswordForm(formData, setLoading, user, logout) {
  setLoading(true);
  const res = await updatePasswordApi(user.id, formData.password, logout);

  if (!res) {
    toast.error("An error has been ocurred while the password was changing");
  } else {
    logout();
  }
  setLoading(false);
}
