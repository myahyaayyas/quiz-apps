import React, { useState } from "react";
import PropTypes from "prop-types";

function RegisterInput({ register }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    register(formData);
  };

  return (
    <form onSubmit={onSubmitHandler} className="register-input">
      <input
        type="text"
        placeholder="Nama"
        name="name"
        value={formData.name}
        onChange={onInputChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={onInputChange}
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        name="password"
        value={formData.password}
        onChange={onInputChange}
      />
      <button>Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
