import { useDispatch, useSelector } from "react-redux";

import React, { useEffect, useState } from "react";
import "./HomeCards.css";

import { useNavigate } from "react-router-dom";
import corazon from "./../../assets/corazon.png";
import comprar from "./../../assets/comprar.png";
import descargar from "./../../assets/descargar.png";
import guardar from "./../../assets/guardar.png";
import corazonclicked from "./../../assets/corazonclicked.png";
import comprarclciked from "./../../assets/comprarclicked.png";
import guardarclicked from "./../../assets/guardarclicked.png";
import Modal from "react-modal";
import Details from "../../pages/Details/Details";

import { addItemToCart, cleanItem } from "../../redux/slices/cartSlice";

import { addLiked, modifyLikesPublication, addFavotites, userCurrentAction } from "../../redux/actions/photosActions";
import zIndex from "@mui/material/styles/zIndex";

export default function Home({ x }) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [check, setCheck] = useState(null);
  const currentUser = useSelector((state) => state.userLoged.currentUser);
  const cart = useSelector((state) => state.cart.cartItems);
  let p = false;

  cart.forEach((el) => {
    if (el._id.includes(x._id)) p = true;
  });

  useEffect(() => {
    if (check !== null) {
      dispatch(userCurrentAction());
    }
  }, [check]);

  Modal.setAppElement("#root");

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

  const handleLike = async () => {
    if (currentUser.liked.includes(x._id)) {
      let aux = currentUser.liked.filter((el) => el !== x._id);
      let arrayWhitoutLikeOfPublication = x.likes.filter((el) => el !== currentUser._id);
      await dispatch(addLiked(aux, currentUser._id));
      await dispatch(modifyLikesPublication(arrayWhitoutLikeOfPublication, x._id));
    } else {
      await dispatch(addLiked([...currentUser.liked, x._id], currentUser._id));

      await dispatch(modifyLikesPublication([...x.likes, currentUser._id], x._id));
    }
    setCheck(check === null ? true : !check);
  };

  const handleSave = async () => {
    if (currentUser.favorites.includes(x._id)) {
      let aux = currentUser.favorites.filter((el) => el !== x._id);
      await dispatch(addFavotites(aux, currentUser._id));
    } else await dispatch(addFavotites([...currentUser.favorites, ...[x._id]], currentUser._id));

    setCheck(check === null ? true : !check);
  };

  return (
    <div className="galery-class">
      <div className="galery-item" onMouseOver={visibleEvent} onMouseOut={() => setVisible(false)}>
        <img id={x._id} src={x.url} className="galery-image" alt="one of the photos" onClick={() => setIsOpen(true)} />

        {visible === !false ? (
          <div className="card_divVisible">
            <div className={x.price ? "card_visibleTop active" : "card_visibleTop"}>
              <div className="card_divPrice">{x.price ? <p className="card-price">{x.price} $</p> : null}</div>
              <div className="card_visibleTopRight">
                <div className="card-divFavorites" onClick={handleLike}>
                  <img alt="relleno" className="card-favorite" src={currentUser.liked.includes(x._id) ? corazonclicked : corazon}></img>
                </div>
                <div className="card-divFavorites" onClick={handleSave}>
                  <img alt="relleno" className="card-guardar" src={currentUser.favorites.includes(x._id) ? guardarclicked : guardar}></img>
                </div>
              </div>
            </div>
            <div className="card_visibleBottom">
              <div className="card_visibleBottomProfile">
                <img alt="relleno" onClick={() => navigate("/profile/" + x.photographer._id)} src={x.photographer.avatar} className="card-users-img" />
                <h3 className="card-title" onClick={() => navigate("/profile/" + x.photographer._id)}>{`${x.photographer.name} ${x.photographer.lastName}`}</h3>
              </div>
              {x.pay ? (
                currentUser.bought.includes(x._id) ? (
                  <img alt="relleno" className="card-download" onClick={() => download()} src={descargar}></img>
                ) : (
                  <div
                    className="card_buttonCart"
                    onClick={() => {
                      p ? dispatch(cleanItem(x._id)) : dispatch(addItemToCart(x));
                    }}
                  >
                    <img src={p ? comprarclciked : comprar} alt="" />
                  </div>
                )
              ) : (
                <img alt="relleno" className="card-download" onClick={() => download()} src={descargar}></img>
              )}
              {/* <button className="card-delete" onClick={() => dispatch(deletePhoto(x._id))}>🗑️</button> */}
            </div>
          </div>
        ) : null}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: { zIndex: 1000 },
        }}
      >
        <Details idFirstModal={x._id} setIsOpen={setIsOpen} />
      </Modal>
    </div> //agrege div este
  );
}
