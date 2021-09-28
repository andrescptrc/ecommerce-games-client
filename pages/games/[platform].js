import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import BasicLayout from "../../layouts/BasicLayout";
import { getGamesPlatformApi, getTotalGamesPlatformApi } from "../../api/game";
import Games from "../../components/ListGames/Games";
import Pagination from "../../components/Pagination";

const limitPerPage = 2;

export default function Platform() {
  const { query } = useRouter();
  const { platform } = query;
  const [games, setGames] = useState(null);
  const [totalGames, setTotalGames] = useState(null);

  const getStartItem = () => {
    const currentPage = parseInt(query.page);
    if (!query.page || currentPage === 1) return 0;
    else return currentPage * limitPerPage - limitPerPage;
  };

  useEffect(() => {
    (async () => {
      if (platform) {
        const res = await getGamesPlatformApi(
          platform,
          limitPerPage,
          getStartItem()
        );
        setGames(res);
      }
    })();
  }, [query]);

  useEffect(() => {
    (async () => {
      if (platform) {
        const res = await getTotalGamesPlatformApi(platform);
        setTotalGames(res);
      }
    })();
  }, [query]);

  return (
    <BasicLayout className="home">
      <Games games={games} />
      {totalGames ? (
        <Pagination
          totalGames={totalGames}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={limitPerPage}
        />
      ) : null}
    </BasicLayout>
  );
}
