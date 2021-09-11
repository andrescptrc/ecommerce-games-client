import { useState } from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth(props) {
  const { onCloseModal, setTitleModal } = props;
  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = () => {
    setTitleModal("Log in");
    setShowLogin(true);
  };
  const showRegisterForm = () => {
    setTitleModal("Create a new user");
    setShowLogin(false);
  };

  return showLogin ? (
    <LoginForm showRegisterForm={showRegisterForm} />
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  );
}
