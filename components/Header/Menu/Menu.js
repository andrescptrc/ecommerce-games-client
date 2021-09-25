import { Container, Menu, Grid, Icon } from "semantic-ui-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { map } from "lodash";

import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../api/user";
import { getPlatformsApi } from "../../../api/platform";

export default function MenuWeb() {
  const [platforms, setPlatforms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Log in");
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const res = await getMeApi(logout);
      setUser(res);
    })();
  }, [auth]);

  useEffect(() => {
    (async () => {
      const res = await getPlatformsApi();
      setPlatforms(res || []);
    })();
  }, []);

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatform platforms={platforms} />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            {user !== undefined && (
              <MenuOptions
                onShowModal={onShowModal}
                user={user}
                logout={logout}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        size="small"
      >
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
}

function MenuPlatform({ platforms }) {
  return (
    <Menu>
      {map(platforms, (platform) => (
        <Link href={`/games/${platform.url}`} key={platform._id}>
          <Menu.Item as="a" name={platform.url}>
            {platform.title}
          </Menu.Item>
        </Link>
      ))}
    </Menu>
  );
}

function MenuOptions(props) {
  const { onShowModal, user, logout } = props;

  return (
    <Menu>
      {user ? (
        <>
          <Link href="/orders">
            <Menu.Item>
              <Icon name="game" />
              My orders
            </Menu.Item>
          </Link>
          <Link href="/wishlist">
            <Menu.Item>
              <Icon name="heart outline" />
              My wishlist
            </Menu.Item>
          </Link>
          <Link href="/account">
            <Menu.Item>
              <Icon name="user outline" />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>
          <Link href="/cart">
            <Menu.Item as="a" className="m-0">
              <Icon name="cart" />
            </Menu.Item>
          </Link>

          <Menu.Item onClick={logout} className="m-0">
            <Icon name="power off" />
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={onShowModal}>
          <Icon name="user outline" />
          My account
        </Menu.Item>
      )}
    </Menu>
  );
}
