import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import BasicLayout from "../../layouts/BasicLayout";
import { getGamesPlatformApi } from "../../api/game";
import Games from "../../components/ListGames/Games";

const limitPerPage = 10;

export default function Platform() {
  const { query } = useRouter();
  const [games, setGames] = useState(null);

  useEffect(() => {
    (async () => {
      if (query.platform) {
        const res = await getGamesPlatformApi(query.platform, limitPerPage, 0);
        setGames(res);
      }
    })();
  }, [query]);

  return (
    <BasicLayout className="home">
      <Games games={games} />
    </BasicLayout>
  );
}
