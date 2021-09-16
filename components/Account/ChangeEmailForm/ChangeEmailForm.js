import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { updateEmailApi } from "../../../api/user";

export default function ChangeEmailForm({ user, logout, setReloadUser }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) =>
      handleChangeForm(
        formData,
        user,
        logout,
        setLoading,
        setReloadUser,
        formik
      ),
  });

  return (
    <div className="change-email-form">
      <h4>
        Change your email <span>(Your current email: {user.email})</span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="email"
            placeholder="Your new email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
          <Form.Input
            name="repeatEmail"
            placeholder="Confirm your new email"
            onChange={formik.handleChange}
            value={formik.values.repeatEmail}
            error={formik.errors.repeatEmail}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          Save changes
        </Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    email: "",
    repeatEmail: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string()
      .email()
      .required()
      .oneOf([Yup.ref("repeatEmail")], true),
    repeatEmail: Yup.string()
      .email()
      .required()
      .oneOf([Yup.ref("email")], true),
  };
}

async function handleChangeForm(
  formData,
  user,
  logout,
  setLoading,
  setReloadUser,
  formik
) {
  setLoading(true);
  const res = await updateEmailApi(user.id, formData.email, logout);
  if (!res || res?.statusCode === 400) {
    toast.error("An error has ocurred when the email was changing");
  } else {
    setReloadUser((reloadUser) => !reloadUser);
    toast.success("The email has been changed succesfuly");
    formik.handleReset();
  }
  setLoading(false);
}
