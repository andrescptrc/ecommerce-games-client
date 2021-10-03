import React, { useEffect, useState } from "react";
import { size, forEach } from "lodash";

import BasicLayout from "../layouts/BasicLayout";
import useAuth from "../hooks/useAuth";
import { getFavoriteApi } from "../api/favorite";
import Games from "../components/ListGames/Games";
import useCart from "../hooks/useCart";

export default function wishlist() {
  const [games, setGames] = useState(null);
  const { auth, logout } = useAuth();

  console.log(useCart());

  useEffect(() => {
    (async () => {
      const res = await getFavoriteApi(auth.idUser, logout);
      if (size(res) > 0) {
        let gamesList = [];
        forEach(res, (data) => {
          gamesList = [...gamesList, data.game];
        });
        setGames(gamesList);
      } else {
        setGames([]);
      }
    })();
  }, []);

  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__block">
        <div className="title">Wishlist</div>
        <div className="data">
          <Games
            games={games}
            title="You don't have any game on your wishlist"
          />
        </div>
      </div>
    </BasicLayout>
  );
}
