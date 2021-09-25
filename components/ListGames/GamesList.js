import React from "react";

import { map } from "lodash";

export default function GamesList({ games }) {
  return (
    <div className="games-list">
      {map(games, (game) => (
        <li>
          <h3>{game.title}</h3>
          <h3>{game.title}</h3>
        </li>
      ))}
    </div>
  );
}
