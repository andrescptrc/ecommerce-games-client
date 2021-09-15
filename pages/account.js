import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import BasicLayout from "../layouts/BasicLayout";
import useAuth from "../hooks/useAuth";
import { getMeApi } from "../api/user";
import ChangeNameForm from "../components/account/ChangeNameForm/ChangeNameForm";

export default function account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await getMeApi(logout);
      setUser(res || null);
    })();
  }, [auth]);

  if (user === undefined) return null;
  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration user={user} logout={logout} />
    </BasicLayout>
  );
}

function Configuration({ user, logout }) {
  return (
    <div className="account__configuration">
      <div className="title">Settings</div>
      <div className="data">
        <ChangeNameForm user={user} logout={logout} />
      </div>
    </div>
  );
}
