import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  getDetails,
  getProfileDetails,
  userCurrentAction,
  addFollowed,
  addFollowers,
  addLiked,
  addFavotites,
  getAllPhotosData,
} from "../../redux/actions/photosActions";
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

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  let navigate = useNavigate();
  const details = useSelector((state) => state.photos.photoDetails);
  const imgRelated = useSelector((state) => state.photos.allPhotosData);
  const photographer = useSelector((state) => state.profile.userData);
  const currentUser = useSelector((state) => state.userLoged.currentUser);
  const tags = useSelector((state) => state.photos.photoDetails.tags)?.split(
    ","
  );
  // estados de cuenta usuario
  const [liked, setLiked] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (currentUser.liked?.includes(id)) setLiked(true);
    else setLiked(false);
    if (currentUser.favorites?.includes(id)) setFavorites(true);
    else setFavorites(false);
    if (currentUser.followed?.includes(photographer._id)) setFollowed(true);
    else setFollowed(false);
  }, [currentUser, id, photographer._id, dispatch]);

  useEffect(() => {
    dispatch(getDetails(id));
    dispatch(getAllPhotosData());
    dispatch(userCurrentAction());
  }, [dispatch, id, check]);

  useEffect(() => {
    return () => dispatch(cleanPhotos());
  }, [dispatch]);

  useEffect(() => {
    if (details.photographer !== undefined)
      dispatch(getProfileDetails(details.photographer));
  }, [details.photographer, dispatch]);

  const handleFollow = async () => {
    console.log("ADD FOLLOWED");
    if (currentUser.followed.includes(details.photographer)) {
      let unFollowed = currentUser.followed.filter(
        (el) => el !== details.photographer
      );
      let unFollowers = photographer.followers.filter(
        (el) => el !== currentUser._id
      );

      await dispatch(addFollowed(unFollowed, currentUser._id));
      await dispatch(addFollowers(unFollowers, photographer._id));
      setCheck(!check);
    } else {
      await dispatch(
        addFollowed(
          [...currentUser.followed, details.photographer],
          currentUser._id
        )
      );
      await dispatch(
        addFollowers(
          [...photographer.followers, currentUser._id],
          details.photographer
        )
      );
      setCheck(!check);
    }
  };

  const handleLike = async () => {
    console.log("ADD LIKED");
    if (currentUser.liked.includes(id)) {
      let aux = currentUser.liked.filter((el) => el !== id);
      await dispatch(addLiked(aux, currentUser._id));
      return setCheck(!check);
    }
    await dispatch(addLiked([...currentUser.liked, ...[id]], currentUser._id));
    setCheck(!check);
  };

  const handleSave = async () => {
    console.log("ADD Favorites");
    if (currentUser.favorites.includes(id)) {
      let aux = currentUser.favorites.filter((el) => el !== id);
      await dispatch(addFavotites(aux, currentUser._id));
      return setCheck(!check);
    }
    await dispatch(
      addFavotites([...currentUser.favorites, ...[id]], currentUser._id)
    );
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
    if (index > 0) navigate("/details/" + imgRelated[index - 1]._id);
  };

  const handleNext = () => {
    const index = imgRelated.findIndex((el) => el._id === id);
    if (index < imgRelated.length - 1)
      navigate("/details/" + imgRelated[index + 1]._id);
  };

  return (
    <div className="container-detail">
      <p className="close-btn" onClick={() => navigate("/")}>
        X
      </p>
      <div className="detail-navbar">
        <div className="left-group">
          <img
            className="avatar-img"
            src={photographer.avatar}
            alt="avatar-profile"
            onClick={() => navigate("/profile/" + details.photographer)}
          />
          <span className="name-ph">{`${photographer.name} ${photographer.lastName}`}</span>
          <button
            className={
              followed !== true
                ? "btn-detail-navbar"
                : "btn-detail-navbar unfollowed"
            }
            onClick={handleFollow}
          >
            <PersonAddAltOutlinedIcon fontSize="small" />
            Seguir
          </button>
        </div>
        <div className="right-group">
          <button
            className={
              liked !== true
                ? "btn-detail-navbar"
                : "btn-detail-navbar unfollowed"
            }
            onClick={handleLike}
          >
            <FavoriteBorderOutlinedIcon fontSize="small" />
            Me gusta
          </button>
          <button
            className={
              favorites !== true
                ? "btn-detail-navbar"
                : "btn-detail-navbar unfollowed"
            }
            onClick={handleSave}
          >
            <BookmarksOutlinedIcon fontSize="small" />
            Guardar
          </button>
        </div>
      </div>

      <div className="central-group">
        <ArrowBackIosNewIcon
          className="prev-next"
          fontSize="large"
          onClick={handlePrev}
        />

        <img className="main-img" src={details.url} alt="main-img" />

        <ArrowForwardIosIcon
          className="prev-next"
          fontSize="large"
          onClick={handleNext}
        />
      </div>

      <div className="detail-description">
        <span className="use">Uso premium</span>
        <div className="title-group">
          <p className="img-title">{details.title}</p>
          <p className="img-ubication">
            <LocationOnOutlinedIcon fontSize="small" />
            Ubication:{" "}
            {details.ubication || "En el medio de la nada - Ningún lugar"}
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

        <button className="btn-share" onClick={handleShare}>
          <ReplyOutlinedIcon fontSize="small" />
          Compartir
        </button>

        <button
          className={!details.pay ? "btn-buy disable" : "btn-buy"}
          disabled={!details.pay}
          onClick={handleBuy}
        >
          <ShoppingCartOutlinedIcon fontSize="small" />
          Comprar
        </button>
      </div>

      <p className="title-related">Relacionado</p>
      <div className="img-related-group">
        {imgRelated.map((el, i) => (
          <div key={i} className="img-related-container">
            <img
              src={el.url}
              alt="img-related"
              className="img-related"
              onClick={() => navigate("/details/" + el._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
