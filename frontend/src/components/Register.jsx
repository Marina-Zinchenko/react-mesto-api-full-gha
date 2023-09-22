import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password });
  };
  return (
    <section className="register conteiner">
      <h1 className="register__title">Регистрация</h1>
      <form className="register__form" onSubmit={handleSubmit}>
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

        <button
          className="register__button"
          type="submit"
          onSubmit={handleSubmit}
        >
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="register__link">
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
}
export default Register;
