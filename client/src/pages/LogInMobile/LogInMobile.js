import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actions/photosActions";
import "../LogIn/Login.css";
import LogoLogIn from "./../../assets/logo-login.png";
import Footer from "../../components/Footer/Footer";
import OjoAbierto from "./../../assets/ojo-abierto.png";
import OjoCerrado from "./../../assets/visible.png";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useSearchParams } from "react-router-dom";
import { logOut } from "../../redux//slices/usersLogedSlice";
import {
  userCurrentAction,
  logoutAction,
} from "../../redux/actions/photosActions";

export default function LogInMobile() {
  const [passwordYes, setPasswordYes] = useState(false);

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");
  const currentUser = useSelector((state) => state.userLoged);

  useEffect(() => {
    async function t() {
      const a = await dispatch(userCurrentAction());
      if (
        a.payload.message === "No token provided" ||
        a.payload.message === "Unauthorized!"
      ) {
        dispatch(logOut());
      }
    }
    t();
  }, [dispatch]);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_ID,
        scope: "email",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setLoginForm({
      ...loginForm,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //this dispatch makes no sense, dispatchs are made to interact whit redux, this does not. I just used because it was like that in the login
      const a = await dispatch(loginAction(loginForm));
      if (a.loged) {
        window.location.href =
          "https://auth.expo.io/@juanfranco/Dark-Room?type=success&state=" +
          state +
          "&jwt=" +
          a.jwt;
      } else {
        //aca va el alert de que algun dato que pusiste esta mal
      }
    } catch (error) {}

    setLoginForm({
      email: "",
      password: "",
    });
  };

  const elementPassword = useRef(null);

  const yesPassword = (e) => {
    setPasswordYes(!passwordYes);
    if (passwordYes === true) {
      elementPassword.current.type = "password";
    } else {
      elementPassword.current.type = "text";
    }
  };

  function responseGoogle(a) {
    console.log(a);
  }
  function responseFacebook(a) {
    console.log(a);
  }

  function componentClicked() {}

  function handleLogOut() {
    dispatch(logOut());
    dispatch(logoutAction());
  }

  async function handleOkAuth() {
    const a = await dispatch(userCurrentAction());

    window.location.href =
      "https://auth.expo.io/@juanfranco/Dark-Room?type=success&state=" +
      state +
      "&jwt=" +
      a.payload.token;
  }

  return (
    <div className="login-total">
      <div className="login_divNav"></div>
      <div className="login-background">
        <div className="login-general-text">
          <h1 className="login-h1">
            Inicia Sessión con <br />
            Darkroom
          </h1>
        </div>
        {currentUser.loged ? (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={currentUser.currentUser.avatar}
              style={{ width: 150, height: 150 }}
            ></img>
            <div>{currentUser.currentUser.email}</div>
            <br />
            <button className="btn-buy" onClick={() => handleOkAuth()}>
              Autorizar usuario en la aplicacion móvil
            </button>
            <br />
            <button className="btn-buy" onClick={() => handleLogOut()}>
              Usar Otra Cuenta
            </button>
          </div>
        ) : (
          <form className="login-background-functional" onSubmit={handleSubmit}>
            <div>
              <img className="login-img" src={LogoLogIn} alt="asdas" />
            </div>
            <div className="div-user">
              <label className="label-user">Usuario o email</label>
              <input
                className="login-user"
                type="text"
                placeholder="Ej: ramiro_diaz@darkroon.com"
                onChange={handleChange}
                name="email"
                value={loginForm.email}
              />
            </div>
            <div className="div-password">
              <label className="label-password">Contraseña</label>
              <input
                ref={elementPassword}
                className="login-password"
                type="password"
                onChange={handleChange}
                name="password"
                value={loginForm.password}
              />
              {passwordYes === true ? (
                <img
                  onClick={yesPassword}
                  src={OjoAbierto}
                  className="eyes-password"
                  alt="asdas"
                ></img>
              ) : (
                <img
                  onClick={yesPassword}
                  src={OjoCerrado}
                  className="eyes-password"
                  alt="asdas"
                ></img>
              )}
              <label className="label-check-password">
                Mas de 6 caracteres
              </label>
            </div>
            <div className="div-check">
              <input className="login-check" type="checkbox" />
              <label className="label-check">Recordar Contraseña</label>
            </div>
            <button className="login-login">Iniciar sessión</button>
            <p className="login-o">o</p>
            <div style={{ width: "300px", alignSelf: "center" }}>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_ID}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_ID}
              autoLoad={false}
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook}
            />
            <p className="login-help-password">¿Te olvidaste la contraseña?</p>
            <p className="login-help">¿Necesitas ayuda?</p>
          </form>
        )}

        {/* <div className="login-background-functional">
        <button className='login-register-after'>Registrarme</button>
        <button 
          className='login-login' 
          onClick={loginFunctional}>
          Iniciar sessión
        </button>
        <p className='login-o'>o</p>
        <button className='login-google'>Continuar con Google</button>
        <button className='login-fb'>Continuar con Facebook</button>
        <p className='login-help'>¿Necesitas ayuda?</p>
      </div> */}
      </div>
      <Footer />
    </div>
  );
}
