import React from "react";
import { map } from "lodash";
import { Image, Grid } from "semantic-ui-react";
import Link from "next/link";

export default function GamesList({ games }) {
  return (
    <div className="games-list">
      <Grid>
        <Grid.Row columns={5}>
          {map(games, (game) => (
            <Game game={game} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

function Game({ game }) {
  return (
    <Grid.Column className="games-list__game">
      <Link href={`/${game.url}`}>
        <a>
          <div className="games-list__game-poster">
            <Image src={game.poster.url} alt={game.title} />
            <div className="games-list__game-poster-info">
              {game.discount ? (
                <span className="discount">-{game.discount}</span>
              ) : (
                <span></span>
              )}
              <span className="price">${game.price}</span>
            </div>
          </div>
          <h2>{game.title}</h2>
        </a>
      </Link>
    </Grid.Column>
  );
}
