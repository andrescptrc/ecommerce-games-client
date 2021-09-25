import React from "react";
import { useRouter } from "next/router";

import BasicLayout from "../../layouts/BasicLayout";

export default function Platform() {
  const { query } = useRouter();

  return (
    <BasicLayout>
      <h1>We are in platform: {query.platform}</h1>
      <h1>We are in platform: {query.platform}</h1>
    </BasicLayout>
  );
}
