import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import axios from "axios";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    axios
      .get("/api/user", { params: { email: email, password: password } })
      .then(function (response) {
        if (response.data) {
          console.log(response.data);
          setToken("123");
          location.href = "/app";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <div className="position-absolute top-0 start-0 p-4 p-md-5">
        <a href="#" className="ps-lg-3">
           {/* <img src="/logo-white.svg" alt="Millaw" />  */}
        </a>
      </div>
      <div className="row g-0 align-items-center">
        <div className="col-lg-7">
        <img
              className="cover-fit"
              src="/signin-cover.png"
              alt="Sign in Cover"
            />
        
        </div>
        <div className="col-lg-5 px-md-3 px-xl-5">
          <div className="px-3 py-4 p-md-5 p-xxl-5 mx-xxl-4">
            <div className="login-form py-2 py-md-0 mx-auto mx-lg-0">
              <h2 className="h1 mb-3">Connexion</h2>
              <Form className="pt-2" onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-4 pb-md-2"
                  size="xl"
                  controlId="email"
                >
                  <Form.Label className="form-label-lg">Email</Form.Label>
                  <Form.Control
                    className="form-control-xl"
                    autoFocus
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-4 pb-md-2"
                  size="xl"
                  controlId="password"
                >
                  <Form.Label className="form-label-lg">
                    Mot de passe
                  </Form.Label>
                  <Form.Control
                    className="form-control-xl"
                    type="password"
                    placeholder="••••••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button
                    size="xl"
                    type="submit"
                    disabled={!validateForm()}
                  >
                    Se connecter
                  </Button>
                </div>
                <div className="my-4 d-flex pb-3">
                  <div className="form-check form-check-sm mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                    ></input>
                    <label
                      className="form-check-label small text-gray-600"
                      htmlFor="gridCheck"
                    >
                      Se souvenir de moi
                    </label>
                  </div>
                  <a href="#" className="small text-gray-600 ms-auto mt-1">
                    Mot de passe oublié ?
                  </a>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div> */}

      {/* <style jsx>
        {`
          html, body {
            height: 100%;
          }
          .bg-gray-100 {
            background-color: #f8f9fa!important;
          }
          .cover-fit {
            height: 100vh;
            width: 100%;
            -o-object-fit: cover;
            object-fit: cover;
          }

          .position-absolute {
            position: absolute!important;
          }

          .login-form {
            max-width: 32.9375rem;
          }

          .row {
            --bs-gutter-x: 1.5rem;
            --bs-gutter-y: 0;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-top: calc(var(--bs-gutter-y) * -1);
            margin-right: calc(var(--bs-gutter-x)/ -2);
            margin-left: calc(var(--bs-gutter-x)/ -2);
          }
        `}
      </style> */}
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
