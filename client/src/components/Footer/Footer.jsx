import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import Global from "./../../assets/global.png";
import Android from "./../../assets/AndroidLogo.png";
import IOS from "./../../assets/AppleLogo.png";

export default function Footer() {
  return (
    <div className="footer-back">
      <div className="footer">
        <div className="footer-app">
          <h1 className="footer-app-h1">Descarga nuestra app para móvil </h1>
          <div className="footer-app-div">
            <Link className="footer-app-ios">
              <img className="footer-img" src={IOS} alt="asdlsad" />
              &#160;&#160;IOS
            </Link>
            <Link className="footer-app-android">
              <img className="footer-img" src={Android} alt="asdlsad" />
              &#160;&#160;Android
            </Link>
          </div>
        </div>
        <div className="footer-rs">
          <h1 className="footer-total-h1">Seguinos</h1>
          <Link className="footer-total-link">Redes sociales</Link>
        </div>
        <div className="footer-pp">
          <h1 className="footer-total-h1">Darkroom</h1>
          <Link className="footer-total-link">Nuestra galeria</Link>
          <Link className="footer-total-link">Retos</Link>
          <Link className="footer-total-link">Colección</Link>
          <Link className="footer-total-link">Lo más descargado</Link>
          <Link className="footer-total-link">Nuestra app</Link>
        </div>
        <div className="footer-company">
          <h1 className="footer-total-h1">Compañia</h1>
          <Link className="footer-total-link">¿Quienes somos?</Link>
          <Link className="footer-total-link">Preguntas frecuentes</Link>
          <Link className="footer-total-link">Emprende con nosotros</Link>
          <Link className="footer-total-link">Politicas y privacidad </Link>
          <Link className="footer-total-link">Blog</Link>
        </div>
      </div>
      <div className="footer-licency">
        <Link className="footer-total-link">©2022 Darkroom</Link>
        <Link className="footer-total-link-licence">Licencia</Link>
        <Link className="footer-total-link">Términos y condiciones</Link>
        <Link className="footer-total-link-a">
          <img src={Global} className="footer-img-español" alt="asdlsad" />
          &#160;&#160;Español
        </Link>
      </div>
    </div>
  );
}
