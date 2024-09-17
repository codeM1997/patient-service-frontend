"use client";
import React, { useState } from "react";
import { loginRequest } from "../services";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const router = useRouter();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginRequest({
      username: loginDetails.email,
      password: loginDetails.password,
    })
      .then((res) => {
        console.log(res);
        if (res.msg === "Auth success") {
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)} className="card-body">
        <input
          type="email"
          placeholder="email"
          className="input input-bordered"
          required
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="password"
          className="input input-bordered"
          required
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, password: e.target.value })
          }
        />
        <input value="login" type="submit" className="btn btn-primary" />
      </form>
    </>
  );
};

export default LoginForm;
