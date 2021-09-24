import React, { useState, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { map, size } from "lodash";

import { getAddressesApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function ListAddress(props) {
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();
  const { reloadAddresses, setReloadAddresses } = props;

  useEffect(() => {
    (async () => {
      const res = await getAddressesApi(auth.idUser, logout);
      setAddresses(res || []);
      setReloadAddresses(false);
    })();
  }, [reloadAddresses]);

  if (!addresses) return null;

  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>Create a address!</h3>
      ) : (
        <Grid>
          {map(addresses, (address) => (
            <Grid.Column key={address.id} mobile={16} table={8} computer={4}>
              <Address address={address} />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
}

function Address({ address }) {
  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city}, {address.postalCode}
      </p>
      <p>{address.phone}</p>

      <div className="actions">
        <Button primary>Edit</Button>
        <Button>Delete</Button>
      </div>
    </div>
  );
}
