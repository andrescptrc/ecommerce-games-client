import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import BasicLayout from "../layouts/BasicLayout";
import { getGameByUrlApi } from "../api/game";
import HeaderGame from "../components/Game/HeaderGame";

export default function Game() {
  const [game, setGame] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      const res = await getGameByUrlApi(query.game);
      setGame(res[0]);
    })();
  }, [query]);

  if (!game) return null;

  return (
    <BasicLayout>
      <HeaderGame game={game} />
      <p>TabsGame</p>
    </BasicLayout>
  );
}
