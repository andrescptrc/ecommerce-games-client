import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { updateNameApi } from "../../../api/user";

export default function ChangeNameForm({ user, logout }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) =>
      handleChangeForm(formData, user, setLoading, logout),
  });

  return (
    <div className="change-name-form">
      <h4>Edit your name and lastnames</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Input
            name="name"
            placeholder="Your new name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name}
          />
          <Form.Input
            name="lastname"
            placeholder="Your new lastnames"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.errors.lastname}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          Save changes
        </Button>
      </Form>
    </div>
  );
}

function initialValues({ name, lastname }) {
  return {
    name: name || "",
    lastname: lastname || "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
  };
}

async function handleChangeForm(formData, user, setLoading, logout) {
  setLoading(true);
  const res = await updateNameApi(user.id, formData, logout);
  if (!res) {
    toast.error("An error has ocurred to change the name and lastnames");
  } else {
    console.log("Name changed");
  }
  setLoading(false);
}
