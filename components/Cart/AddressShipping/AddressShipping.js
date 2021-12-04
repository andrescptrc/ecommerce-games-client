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
    <div className="address-shipping">
      <div className="title">Address Shipping</div>
      <div className="data">
        {size(adresses) === 0 ? (
          <h3>
            There's no any address
            <Link href="/account">
              <a>create your first address</a>
            </Link>
          </h3>
        ) : (
          <Grid>
            {map(adresses, (address) => (
              <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                <Address address={address} />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

function Address(props) {
  const { address } = props;

  return (
    <div>
      <p>Address</p>
    </div>
  );
}
