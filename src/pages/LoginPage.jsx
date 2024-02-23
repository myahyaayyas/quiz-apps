import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/network-data";

function LoginPage({ loginSuccess }) {
  const [error, setError] = useState(null);

  async function onLogin({ email, password }) {
    try {
      const { error, data } = await login({ email, password });

      if (!error) {
        loginSuccess(data);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again later.");
    }
  }

  return (
    <section>
      <h2>Yuk, login untuk menggunakan aplikasi.</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      <div className="input-login">
        <LoginInput login={onLogin} />
      </div>
      <p>
        Belum punya akun? <Link to="/register">Daftar di sini.</Link>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
