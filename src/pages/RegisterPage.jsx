import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/network-data";

function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function onRegisterHandler(user) {
    try {
      const { error } = await register(user);
      if (!error) {
        navigate("/");
      } else {
        setError("Registration failed. Please check your information and try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An error occurred. Please try again later.");
    }
  }

  return (
    <section>
      <h2>Isi form untuk mendaftar akun.</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="input-register">
        <RegisterInput register={onRegisterHandler} />
      </div>
      <p>
        Kembali ke <Link to="/">Masuk</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
