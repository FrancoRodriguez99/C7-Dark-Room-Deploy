import LogoLogIn from "./../../assets/logo-login.png";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
export default function UserScreen() {
  return (
    <div className="login-total">
      <div className="login_divNav">
        <Navbar />
      </div>
      <div className="login-background">
        <div className="login-general-text">
          <h1 className="login-h1">
            Inicia Sessión con <br />
            Darkroom
          </h1>
        </div>
        <div style={{ width: "100%", textAlign: "center" }}>
          <img className="login-img" src={LogoLogIn} alt="asdas" />
        </div>

        <div className="login-background-functional">
          <Link
            className="login-register-after"
            to="/users"
            style={{
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Registrarme
          </Link>
          <Link
            className="login-login"
            style={{
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            to="/logInScreen"
          >
            Iniciar sessión
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
