import React, { useState, useRef } from "react";
import "./Register.css";
import LogoLogIn from "./../../assets/logo-login.png";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import OjoAbierto from "./../../assets/ojo-abierto.png";
import OjoCerrado from "./../../assets/visible.png";
import { Link, useParams } from "react-router-dom";
import {
  registerUser,
  loginAction,
  userCurrentAction,
} from "../../redux/actions/photosActions";
import { useDispatch } from "react-redux";

export default function Register() {
  const dispatch = useDispatch();
  const params = useParams();
  const [email, setEmail] = useState({ value: "", error: true });
  const [password, setPassword] = useState({ value: "", error: true });
  const [checkPassword, setCheckPassword] = useState();
  const [passwordYesRegister, setPasswordYesRegister] = useState(false);
  const [passwordYesRegister2, setPasswordYesRegister2] = useState(false);

  const elementPasswordRegister = useRef(null);
  const elementPasswordRegister2 = useRef(null);

  const yesRegister = (e) => {
    setPasswordYesRegister(!passwordYesRegister);
    if (passwordYesRegister === true) {
      elementPasswordRegister.current.type = "password";
    } else {
      elementPasswordRegister.current.type = "text";
    }
  };

  const yesRegister2 = (e) => {
    setPasswordYesRegister2(!passwordYesRegister2);
    if (passwordYesRegister2 === true) {
      elementPasswordRegister2.current.type = "password";
    } else {
      elementPasswordRegister2.current.type = "text";
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (email.error || password.error) {
    } else {
      const a = await registerUser({
        email: email.value,
        password: password.value,
        userType: params.userType,
      });
      if (a.creado) {
        await dispatch(
          loginAction({ email: email.value, password: password.value })
        );
        await dispatch(userCurrentAction());
      }
    }
  }

  function handleEmail(e) {
    //eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value))
      setEmail({ value: e.target.value, error: false });
    else setEmail({ value: "", error: true });
  }

  function handlePassword(e) {
    //eslint-disable-next-line
    if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(e.target.value)) {
      setPassword({ value: e.target.value, error: false });
    } else setPassword({ value: "", error: true });
  }

  function handlePasswordCheck(e) {
    //eslint-disable-next-line
    if (password.value === e.target.value)
      setPassword({ value: e.target.value, error: false });
    else setPassword({ value: password.value, error: true });
  }

  return (
    <div className="register-total">
      <div className="register_div">
        <Navbar />
      </div>
      <div className="register-background">
        <div className="register-general-text">
          <h1 className="register-h1">
            Registrate con <br />
            Darkroom
          </h1>
        </div>
        <form className="register-background-functional">
          <div>
            <img className="login-img" src={LogoLogIn} alt="logo" />
          </div>
          <div className="div-user-register">
            <label className="label-user-register">Email</label>
            <input
              className={
                email.error ? "login-user-register_red" : "login-user-register"
              }
              type="email"
              placeholder="Ej: ramiro_diaz@darkroon.com"
              onChange={(e) => handleEmail(e)}
            />
          </div>
          <div className="div-password-register">
            <label className="label-password-register">Contraseña</label>
            <input
              className={
                password.error
                  ? "login-password-register_red"
                  : "login-password-register"
              }
              type="password"
              ref={elementPasswordRegister}
              onChange={(e) => handlePassword(e)}
            />
            {passwordYesRegister === true ? (
              <img
                alt="mostrar password"
                onClick={yesRegister}
                src={OjoAbierto}
                className="eyes-password"
              ></img>
            ) : (
              <img
                alt="mostar password"
                onClick={yesRegister}
                src={OjoCerrado}
                className="eyes-password"
              ></img>
            )}
          </div>
          <div className="div-password-register">
            <label className="label-password-register">
              Repetir contraseña
            </label>
            <input
              className={
                password.error
                  ? "login-password-register_red"
                  : "login-password-register"
              }
              type="password"
              ref={elementPasswordRegister2}
              onChange={(e) => handlePasswordCheck(e)}
            />
            {passwordYesRegister2 === true ? (
              <img
                alt="logo"
                onClick={yesRegister2}
                src={OjoAbierto}
                className="eyes-password"
              ></img>
            ) : (
              <img
                alt="mostrar password"
                onClick={yesRegister2}
                src={OjoCerrado}
                className="eyes-password"
              ></img>
            )}
            <label className="label-check-password-register">
              Mas de 6 caracteres
            </label>
          </div>
          <div className="div-check-register">
            <input className="login-check-register" type="checkbox" />
            <label className="label-check-register">Recordar Contraseña</label>
          </div>
          <button
            className="register-register"
            style={{ borderRadius: "20px" }}
            onClick={(e) => handleSubmit(e)}
          >
            Registrarse
          </button>
          <p className="register-o">o</p>
          <Link
            className="register-google"
            style={{
              borderRadius: "20px",
              textDecoration: "none",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            to="/login"
          >
            Continuar con Google
          </Link>
          <Link
            className="register-fb"
            to="/login"
            style={{
              borderRadius: "20px",
              textDecoration: "none",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Continuar con Facebook
          </Link>
          <p className="register-help-password">¿Te olvidaste la contraseña?</p>
          <p className="register-help">¿Necesitas ayuda?</p>
        </form>
      </div>

      <Footer />
    </div>
  );
}
