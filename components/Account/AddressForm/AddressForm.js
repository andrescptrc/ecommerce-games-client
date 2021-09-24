import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import useAuth from "../../../hooks/useAuth";
import { createAddressApi } from "../../../api/address";

export default function AddressForm({ setShowModal, setReloadAddresses }) {
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) =>
      createAddress(
        formData,
        setLoading,
        auth,
        logout,
        formik,
        setShowModal,
        setReloadAddresses
      ),
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        type="text"
        label="Title's address"
        placeholder="Title's address"
        onChange={formik.handleChange}
        values={formik.values.title}
        error={formik.errors.title}
      />

      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          label="Name and lastname"
          placeholder="Name and lastname"
          onChange={formik.handleChange}
          values={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Input
          name="address"
          type="text"
          label="Address"
          placeholder="Address"
          onChange={formik.handleChange}
          values={formik.values.address}
          error={formik.errors.address}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="city"
          type="text"
          label="City"
          placeholder="City"
          onChange={formik.handleChange}
          values={formik.values.city}
          error={formik.errors.city}
        />
        <Form.Input
          name="state"
          type="text"
          label="State/Region"
          placeholder="State/Region"
          onChange={formik.handleChange}
          values={formik.values.state}
          error={formik.errors.state}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="postalCode"
          type="text"
          label="Postal Code"
          placeholder="Postal Code"
          onChange={formik.handleChange}
          values={formik.values.postalCode}
          error={formik.errors.postalCode}
        />
        <Form.Input
          name="phone"
          type="text"
          label="Phone number"
          placeholder="Phone number"
          onChange={formik.handleChange}
          values={formik.values.phone}
          error={formik.errors.phone}
        />
      </Form.Group>
      <div className="actions">
        <Button className="submit" type="submit" loading={loading}>
          Create a address
        </Button>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    title: "",
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required(true),
    name: Yup.string().required(true),
    address: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    postalCode: Yup.string().required(true),
    phone: Yup.string().required(true),
  };
}

const createAddress = async (
  formData,
  setLoading,
  auth,
  logout,
  formik,
  setShowModal,
  setReloadAddresses
) => {
  setLoading(true);
  const formDataTemp = {
    ...formData,
    user: auth.idUser,
  };
  const res = await createAddressApi(formDataTemp, logout);
  if (!res) {
    toast.warning("An error has ocurred");
    setLoading(false);
  } else {
    formik.resetForm();
    setReloadAddresses(true);
    setLoading(false);
    setShowModal(false);
  }
};
