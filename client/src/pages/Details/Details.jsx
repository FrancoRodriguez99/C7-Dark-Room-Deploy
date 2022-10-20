import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getDetails, userCurrentAction, addFollowed, addFollowers, addLiked, addFavotites, getAllPhotosData, modifyLikesPublication } from "../../redux/actions/photosActions";
import { cleanPhotos } from "../../redux/slices/photosSlice";
import { addItemToCart } from "../../redux/slices/cartSlice";
//materialUI icons
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import "./Details.css";

export default function Details({ idFirstModal, setIsOpen }) {
  const dispatch = useDispatch();
  const location = useLocation();
  let navigate = useNavigate();
  const details = useSelector((state) => state.photos.photoDetails);
  const imgRelated = useSelector((state) => state.photos.allPhotosData);
  const currentUser = useSelector((state) => state.userLoged.currentUser);
  const tags = useSelector((state) => state.photos.photoDetails.tags)?.split(",");
  // estados de cuenta usuario
  const [liked, setLiked] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [check, setCheck] = useState(false);
  const [id, setid] = useState(idFirstModal);
console.log('currentUser', currentUser)
  useEffect(() => {
    if (currentUser.liked?.includes(id)) setLiked(true);
    else setLiked(false);
    if (currentUser.favorites?.includes(id)) setFavorites(true);
    else setFavorites(false);
    if (currentUser.followed?.includes(details.photographer._id)) setFollowed(true);
    else setFollowed(false);
  }, [currentUser, id, details.photographer._id, dispatch]);

  useEffect(() => {
    dispatch(getDetails(id));
    dispatch(getAllPhotosData());
    dispatch(userCurrentAction());
  }, [dispatch, id, check]);

  useEffect(() => {
    return () => dispatch(cleanPhotos());
  }, [dispatch]);

  const handleFollow = async () => {
    console.log("ADD FOLLOWED");
    if (currentUser.followed.includes(details.photographer._id)) {
      let unFollowed = currentUser.followed.filter((el) => el !== details.photographer._id);
      let unFollowers = details.photographer.followers.filter((el) => el !== currentUser._id);

      await dispatch(addFollowed(unFollowed, currentUser._id));
      await dispatch(addFollowers(unFollowers, details.photographer._id));
      setCheck(!check);
    } else {
      await dispatch(addFollowed([...currentUser.followed, details.photographer._id], currentUser._id));
      await dispatch(addFollowers([...details.photographer.followers, currentUser._id], details.photographer._id));
      setCheck(!check);
    }
  };

  const handleLike = async () => {
    console.log("ADD LIKED");
    if (currentUser.liked.includes(id)) {
      let aux = currentUser.liked.filter((el) => el !== id);
      let arrayWhitoutLikeOfPublication = details.likes.filter((el) => el !== currentUser._id);
      await dispatch(addLiked(aux, currentUser._id));
      await dispatch(modifyLikesPublication(arrayWhitoutLikeOfPublication, details._id));
      return setCheck(!check);
    }
    await dispatch(addLiked([...currentUser.liked, ...[id]], currentUser._id));

    await dispatch(modifyLikesPublication([...details.likes, currentUser._id], details._id));
    setCheck(!check);
  };

  const handleSave = async () => {
    console.log("ADD Favorites");
    if (currentUser.favorites.includes(id)) {
      let aux = currentUser.favorites.filter((el) => el !== id);
      await dispatch(addFavotites(aux, currentUser._id));
      return setCheck(!check);
    }
    await dispatch(addFavotites([...currentUser.favorites, ...[id]], currentUser._id));
    setCheck(!check);
  };

  const handleShare = () => {
    console.log(location.pathname);
    alert(location.pathname);
  };

  const handleBuy = () => {
    console.log("dame toda la $$$$ en fotos");
    dispatch(addItemToCart(details));
  };

  const handlePrev = () => {
    const index = imgRelated.findIndex((el) => el._id === id);
    if (index > 0) setid(imgRelated[index - 1]._id);
  };

  const handleNext = () => {
    const index = imgRelated.findIndex((el) => el._id === id);
    if (index < imgRelated.length - 1) setid(imgRelated[index + 1]._id);
  };

  const download = (e) => {
    fetch(details.url, {
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

  return (
    <div className="container-detail">
      <p className="close-btn" onClick={() => setIsOpen(false)}>
        X
      </p>
      <div className="detail-navbar">
        <div className="left-group">
          <img className="avatar-img" src={details.photographer.avatar} alt="avatar-profile" onClick={() => navigate("/profile/" + details.photographer._id)} />
          <span className="name-ph">{`${details.photographer.name} ${details.photographer.lastName}`}</span>
          <button 
            className={followed !== true ? "btn-detail-navbar" : "btn-detail-navbar unfollowed"} 
            onClick={handleFollow}
            disabled={details.photographer._id === currentUser._id}
          >
            <PersonAddAltOutlinedIcon fontSize="small" />
            Seguir
          </button>
        </div>
        <div className="right-group">
          <button className={liked !== true ? "btn-detail-navbar" : "btn-detail-navbar unfollowed"} onClick={handleLike}>
            <FavoriteBorderOutlinedIcon fontSize="small" />
            Me gusta {details.likes?.length}
          </button>
          <button className={favorites !== true ? "btn-detail-navbar" : "btn-detail-navbar unfollowed"} onClick={handleSave}>
            <BookmarksOutlinedIcon fontSize="small" />
            Guardar
          </button>
        </div>
      </div>

      <div className="central-group">
        <ArrowBackIosNewIcon className="prev-next" fontSize="large" onClick={handlePrev} />

        <img className="main-img" src={details.url} alt="main-img" />

        <ArrowForwardIosIcon className="prev-next" fontSize="large" onClick={handleNext} />
      </div>

      <div className="detail-description">
        {
          details.pay === true ?
          <span className="use">Uso premium</span>
          :
          <span className="use">Uso público</span>
        }
        <div className="title-group">
          <p className="img-title">{details.title}</p>
          <p className="img-ubication">
            <LocationOnOutlinedIcon fontSize="small" />
            Ubication: {details.ubication || "En el medio de la nada - Ningún lugar"}
          </p>

          <p className="tags">Etiquetas</p>
          <div className="tags-group">
            {tags ? (
              tags?.map((el, i) => (
                <div key={i}>
                  <p className="img-tag">
                    <LocalOfferOutlinedIcon fontSize="small" />
                    {el.trim()}
                  </p>
                </div>
              ))
            ) : (
              <>
                <p className="img-tag">
                  <LocalOfferOutlinedIcon fontSize="small" />
                  Bosque
                </p>
                <p className="img-tag">
                  <LocalOfferOutlinedIcon fontSize="small" />
                  Playa
                </p>
                <p className="img-tag">
                  <LocalOfferOutlinedIcon fontSize="small" />
                  Montaña
                </p>
              </>
            )}
          </div>
        </div>

        {/* <button className="btn-share" onClick={handleShare}>
          <ReplyOutlinedIcon fontSize="small" />
          Compartir
        </button> */}
        {details.pay ? (
          currentUser.bought.includes(details._id) ? (
            <button className="btn-buy" onClick={download}>
              Descargar
            </button>
          ) : (
            <button className="btn-buy" onClick={handleBuy}>
              <ShoppingCartOutlinedIcon fontSize="small" />
              Comprar
            </button>
          )
        ) : (
          <button className="btn-buy" onClick={download}>
            Descargar
          </button>
        )}
      </div>

      <p className="title-related">Relacionado</p>
      <div className="img-related-group">
        {imgRelated.map((el, i) => (
          <div key={i} className="img-related-container">
            <img src={el.url} alt="img-related" className="img-related" onClick={() => setid(el._id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
