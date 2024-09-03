"use client";
import React from "react";
const LoginForm = () => {
  const check = (event: Event) => {
    event.preventDefault()
    console.log("1",event.target );
  };

  return (
    <form onSubmit={check} className="card-body">
      <input
        type="email"
        placeholder="email"
        className="input input-bordered"
        required
      />
      <input
        type="password"
        placeholder="password"
        className="input input-bordered"
        required
      />
      <input value="login" type="submit" className="btn btn-primary" />
    </form>
  );
};

export default LoginForm;
