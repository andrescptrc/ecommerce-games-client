import React from "react";
import { Loader } from "semantic-ui-react";
import { size } from "lodash";

import ListGames from ".";

export default function Games({ games, title }) {
  return (
    <>
      {!games && <Loader active>Loading games</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>{title}</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </>
  );
}
