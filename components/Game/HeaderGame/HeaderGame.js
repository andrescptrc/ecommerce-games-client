import React, { useState, useEffect } from "react";
import { Grid, Image, Icon, Button } from "semantic-ui-react";
import { size } from "lodash";
import classNames from "classnames";

import useAuth from "../../../hooks/useAuth";
import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from "../../../api/favorite";

export default function HeaderGame({ game }) {
  const { poster, title } = game;

  return (
    <Grid className="header-game">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={poster.url} alt={title} fluid />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info game={game} />
      </Grid.Column>
    </Grid>
  );
}

function Info({ game }) {
  const { title, summary, price, discount } = game;
  const [isFavorite, setIsFavorite] = useState(false);
  const [reloadFavorite, setReloadFavorite] = useState(false);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const res = await isFavoriteApi(auth.idUser, game.id, logout);
      if (size(res) > 0) setIsFavorite(true);
      else setIsFavorite(false);
      setReloadFavorite(false);
    })();
  }, [game, reloadFavorite]);

  const handleAddFavorite = async () => {
    if (auth) {
      await addFavoriteApi(auth.idUser, game.id, logout);
      setReloadFavorite(true);
    }
  };

  const handleDeleteFavorite = async () => {
    if (auth) {
      await deleteFavoriteApi(auth.idUser, game.id, logout);
      setReloadFavorite(true);
    }
  };

  return (
    <>
      <div className="header-game__title">
        {title}
        <Icon
          name={isFavorite ? "heart" : "heart outline"}
          link
          className={classNames({
            like: isFavorite,
          })}
          onClick={isFavorite ? handleDeleteFavorite : handleAddFavorite}
        />
      </div>
      <div className="header-game__delivery">Delivery at 24/48 hours</div>
      <div
        className="header-game__summary"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
      <div className="header-game__buy">
        <div className="header-game__buy-price">
          <p>Public's sell price: ${price}</p>
          <div className="header-game__buy-price-actions">
            <p>-${discount}%</p>
            <p>${price - Math.floor(price * discount) / 100}</p>
          </div>
        </div>
        <Button className="header-game__buy-btn">Buy</Button>
      </div>
    </>
  );
}
