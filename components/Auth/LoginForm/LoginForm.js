import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";

import { loginApi, resetPasswordApi } from "../../../api/user";
import useAuth from "../../../hooks/useAuth";

export default function LoginForm(props) {
  const { showRegisterForm, onCloseModal } = props;
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) =>
      handleLogin(formData, setLoading, onCloseModal, login),
  });

  const resetPassword = () => {
    formik.setErrors({});
    const validateEmail = Yup.string().email(true).required(true);

    if (!validateEmail.isValidSync(formik.values.identifier)) {
      formik.setErrors({ identifier: true });
    } else {
      resetPasswordApi(formik.values.identifier);
    }
  };

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Email"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Password"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

      <div className="actions">
        <Button type="button" basic onClick={showRegisterForm}>
          Create an account
        </Button>
        <div>
          <Button className="submit" type="submit" loading={loading}>
            Log in
          </Button>
          <Button type="button" onClick={resetPassword}>
            Did you forget your password?
          </Button>
        </div>
      </div>
    </Form>
  );
}

const initialValue = () => {
  return {
    identifier: "",
    password: "",
  };
};

function validationSchema() {
  return {
    identifier: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}

const handleLogin = async (formData, setLoading, onCloseModal, login) => {
  setLoading(true);
  const res = await loginApi(formData);
  if (res?.jwt) {
    login(res.jwt);
    onCloseModal();
  } else {
    toast.error("The email or the password are wrong");
  }
  setLoading(false);
};
