import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { size } from "lodash";

import BasicLayout from "../layouts/BasicLayout";
import Games from "../components/ListGames/Games";
import { searchGamesApi } from "../api/game";

export default function search() {
  const [games, setGames] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    document.getElementById("search-game").focus();
  }, []);

  useEffect(() => {
    (async () => {
      if (size(query.query) > 0) {
        const res = await searchGamesApi(query.query);
        if (size(res) > 0) setGames(res);
        else setGames({});
      } else {
        setGames({});
      }
    })();
  }, [query]);

  return (
    <BasicLayout className="search">
      <Games games={games} title="Games not found" />
    </BasicLayout>
  );
}
