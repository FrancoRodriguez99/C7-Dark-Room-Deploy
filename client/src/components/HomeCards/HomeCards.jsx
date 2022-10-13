import { useDispatch } from "react-redux";

import React, { useState } from "react";
import "./HomeCards.css";

import { useNavigate } from "react-router-dom";
import corazon from "./../../assets/corazon.png";
import comprar from './../../assets/comprar.png';
import descargar from "./../../assets/descargar.png";
import guardar from "./../../assets/guardar.png";

import { addItemToCart } from "../../redux/slices/cartSlice";

export default function Home({ x }) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const download = (e) => {
    fetch(x.url, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [visible, setVisible] = useState(false);

  const visibleEvent = () => {
    setVisible(true);
  };

  return (
    <div className="galery-class">
      <div
        className="galery-item"
        onMouseOver={visibleEvent}
        onMouseOut={() => setVisible(false)}
      >
        <img
          id={x._id}
          src={x.url}
          className="galery-image"
          alt="one of the photos"
          onClick={() => navigate("/details/" + x._id)}
        />

        {visible === !false ? (
          <div className="card_divVisible">
            <div
              className={x.price ? "card_visibleTop active" : "card_visibleTop"}
            >
              <div className="card_divPrice">
                {x.price ? <p className="card-price">{x.price} $</p> : null}
              </div>
              <div className="card_visibleTopRight">
                <div className="card-divFavorites">
                  <img
                    alt="relleno"
                    className="card-favorite"
                    src={corazon}
                  ></img>
                </div>
                <div className="card-divFavorites">
                  <img
                    alt="relleno"
                    className="card-guardar"
                    src={guardar}
                  ></img>
                </div>
              </div>
            </div>
            <div className="card_visibleBottom">
              <div className="card_visibleBottomProfile">
                <img
                  alt="relleno"
                  onClick={() => navigate("/profile/" + x.photographer._id)}
                  src={x.photographer.avatar}
                  className="card-users-img"
                />
                <h3
                  className="card-title"
                  onClick={() => navigate("/profile/" + x.photographer._id)}
                >{`${x.photographer.name} ${x.photographer.lastName}`}</h3>
              </div>
              {x.price ? (
                <div className="card_buttonCart" onClick={() => dispatch(addItemToCart(x))}>
                  <img src={comprar} alt=""/>
                </div>
              ) : (
                <img
                  alt="relleno"
                  className="card-download"
                  onClick={() => download()}
                  src={descargar}
                ></img>
              )}
              {/* <button className="card-delete" onClick={() => dispatch(deletePhoto(x._id))}>🗑️</button> */}
            </div>
          </div>
        ) : null}
      </div>
    </div> //agrege div este
  );
}
