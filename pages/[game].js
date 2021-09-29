import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import BasicLayout from "../layouts/BasicLayout";
import { getGameByUrlApi } from "../api/game";

export default function Game() {
  const [game, setGame] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      const res = await getGameByUrlApi(query.game);
      setGame(res[0]);
    })();
  }, []);

  return (
    <BasicLayout>
      <h1>We're on Game {query.game}</h1>
      <h1>We're on Game</h1>
    </BasicLayout>
  );
}
