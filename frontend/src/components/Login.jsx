import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({ email, password });
  }
  return (
    <section className="register conteiner">
      <form className="register__form" onSubmit={handleSubmit}>
         <h1 className="register__title">Вход</h1>
        <input
          className="register__input"
          placeholder="Введите email"
          type="email"
          name="email"
          value={email || ""}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <input
          className="register__input"
          placeholder="Введите пароль"
          type="password"
          name="password"
          value={password || ""}
          onChange={({ target: { value } }) => setPassword(value)}
        />

        <button className="register__button" type="submit">
          Войти
        </button>
      </form>
      </section>  
  );
}
export default Login;
