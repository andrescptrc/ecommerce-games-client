import { useEffect, useState } from "react";
import { size } from "lodash";

import BasicLayout from "../layouts/BasicLayout";
import { getLastGamesApi } from "../api/game";
import Games from "../components/ListGames/Games";

export default function Home() {
  const [games, setGames] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getLastGamesApi(50);
      if (size(res) > 0) setGames(res);
      else setGames([]);
    })();
  }, []);

  return (
    <BasicLayout className="home">
      <Games games={games} title="There's no games available" />
    </BasicLayout>
  );
}
