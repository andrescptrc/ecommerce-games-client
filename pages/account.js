import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Icon } from "semantic-ui-react";

import BasicLayout from "../layouts/BasicLayout";
import useAuth from "../hooks/useAuth";
import { getMeApi } from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";
import BasicModal from "../components/Modal/BasicModal";
import AddressForm from "../components/Account/AddressForm";
import ListAddress from "../components/Account/ListAddress";

export default function account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await getMeApi(logout);
      setUser(res || null);
    })();
  }, [auth]);

  if (user === undefined) return null;
  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
    </BasicLayout>
  );
}

function Configuration({ user, logout, setReloadUser }) {
  return (
    <div className="account__configuration">
      <div className="title">Settings</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangeEmailForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangePasswordForm user={user} logout={logout} />
        <Adresses />
      </div>
    </div>
  );
}

function Adresses() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState(null);
  const [reloadAddresses, setReloadAddresses] = useState(false);

  const openModal = (title, address) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        setShowModal={setShowModal}
        setReloadAddresses={setReloadAddresses}
        newAddress={address ? false : true}
        address={address || null}
      />
    );
    setShowModal(true);
  };

  return (
    <div className="account__adresses">
      <div className="title">
        Adresses
        <Icon name="plus" link onClick={() => openModal("New address")} />
      </div>
      <div className="data">
        <ListAddress
          reloadAddresses={reloadAddresses}
          setReloadAddresses={setReloadAddresses}
          openModal={openModal}
        />
      </div>

      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {formModal}
      </BasicModal>
    </div>
  );
}
