export default function LoginForm(props) {
  const { showRegisterForm } = props;

  return (
    <div>
      <h2>We are on the login form</h2>
      <button onClick={showRegisterForm}>Go to the register</button>
    </div>
  );
}
