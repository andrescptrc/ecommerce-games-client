import React, { useEffect, useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { map, size } from "lodash";
import Link from "next/link";
import classNames from "classnames";
import { getAddressesApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function AddressShipping() {
  const [adresses, setAdresses] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const res = await getAddressesApi(auth.idUser, logout);
      setAdresses(res || []);
    })();
  }, []);

  return (
    <div>
      <h1>AddressShipping</h1>
    </div>
  );
}
