import { useEffect, useState } from "react";
import { size } from "lodash";
import { Loader } from "semantic-ui-react";

import BasicLayout from "../layouts/BasicLayout";
import { getLastGamesApi } from "../api/game";
import ListGames from "../components/ListGames";

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
      {!games && <Loader active>Loading games</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>There's no games available</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
