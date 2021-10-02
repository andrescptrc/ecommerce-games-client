import React from "react";
import { map } from "lodash";
import { Image, Grid } from "semantic-ui-react";
import Link from "next/link";

import useWindowSize from "../../hooks/useWindowSize";
import {
  breakpointUpSm,
  breakpointUpMd,
  breakpointUpLg,
} from "../../utils/breakpoints";

export default function GamesList({ games }) {
  const { width } = useWindowSize();

  const getColumnsRender = () => {
    switch (true) {
      case width > breakpointUpLg:
        return 5;
      case width > breakpointUpMd:
        return 3;
      case width > breakpointUpSm:
        return 2;
      default:
        return 1;
    }
  };

  return (
    <div className="games-list">
      <Grid>
        <Grid.Row columns={getColumnsRender()}>
          {map(games, (game) => (
            <Game game={game} key={game.id} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

function Game({ game }) {
  const { url, poster, title, discount, price } = game;

  return (
    <Grid.Column className="games-list__game">
      <Link href={`/${url}`}>
        <a>
          <div className="games-list__game-poster">
            <Image src={poster.url} alt={title} />
            <div className="games-list__game-poster-info">
              {discount ? (
                <span className="discount">-{discount}</span>
              ) : (
                <span></span>
              )}
              <span className="price">${price}</span>
            </div>
          </div>
          <h2>{title}</h2>
        </a>
      </Link>
    </Grid.Column>
  );
}
