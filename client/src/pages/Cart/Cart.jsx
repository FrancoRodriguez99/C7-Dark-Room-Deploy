import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart, cleanItem } from "../../redux/slices/cartSlice";
import { buyItems, getProfileDetails, addFavotites, getAllPhotosData } from "../../redux/actions/photosActions";
import { cleanProfileDetails } from "../../redux/slices/profileSlice";

import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import cartImage from "../../assets/cart.png";

import "./Cart.css";

//materialUI icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

export default function Home() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.userLoged.currentUser);
  const isLogged = useSelector((state) => state.userLoged.loged);
  const details = useSelector((state) => state.profile.userData);
  const allImages = useSelector((state) => state.photos.allPhotosData);

  const [state, setState] = useState("");
  const [check, setCheck] = useState(false);

  let total = cart.reduce((acumulador, actual) => acumulador + actual.price, 0);

  useEffect(() => {
    dispatch(getProfileDetails(user._id));
    dispatch(getAllPhotosData());
    return () => dispatch(cleanProfileDetails());
  }, [dispatch, user._id, check]);

  useEffect(() => {
    async function t() {
      const a = await buyItems({ items: cart, userId: user._id });
      setState(a);
    }
    t();
  }, [cart, user._id]);

  const handleUnSave = async (id) => {
    let aux = details.favorites.filter((el) => el._id !== id);
    await dispatch(addFavotites(aux, details._id));
    setCheck(!check);
  };

  return (
    <div>
      <div className="cart-navbar">
        <NavBar />
      </div>
      {cart.length > 0 ? (
        <div className="cart-container">
          <div>
            <span className="cart-title">Carrito ({cart.length})</span>
            <div className="cart-group">
              <div className="cart-left">
                <p className="cart-bottom-text">Estas son tus fotos sumadas al carrito, aprovecha a comprarlas </p>
                <div className="cart-group-panel">
                  <div className="cart-panel">
                    <p className="cart-panel-title">
                      Carrito{" "}
                      <span className="cart-panel-title-icon">
                        <ShoppingCartIcon fontSize="medium" />
                      </span>
                    </p>
                    <p className="cart-panel-number no-empty">{cart.length}</p>
                  </div>
                  <div className="cart-panel">
                    <p className="cart-panel-title">
                      Guardados{" "}
                      <span className="cart-panel-title-icon">
                        <BookmarksIcon fontSize="medium" />
                      </span>
                    </p>
                    <p className="cart-panel-number no-empty">{details.favorites.length}</p>
                  </div>
                </div>
                <div className="cart-galery">
                  <div className="cart-galery-buy">
                    {cart.map((x) => (
                      <div key={x._id} className="galery-row">
                        <button onClick={() => dispatch(cleanItem(x._id))} className="btn-remove-item">
                          -
                        </button>
                        <img src={x.url} alt="cart-img" className="cart-img-url" />
                        <div className="cart-description-img">
                          <p>
                            <span className="cart-description-img-title">Titulo: </span>
                            {x.title}
                          </p>
                          <p className="cart-description-text">
                            <span className="cart-description-img-text">Usuario: </span>
                            {x.photographer.name + " " + x.photographer.lastName}
                          </p>
                          <p className="cart-description-text">
                            <span className="cart-description-img-text">Valor ARS: </span>
                            {x.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-galery-favorites">
                    {details.favorites?.map((x) => (
                      <div key={x._id} className="galery-row">
                        <button onClick={() => handleUnSave(x._id)} className="btn-remove-item">
                          -
                        </button>
                        <img src={x.url} alt="cart-img" className="cart-img-url" />
                        <div className="cart-description-img">
                          <p>
                            <span className="cart-description-img-title">Titulo: </span>
                            {x.title}
                          </p>
                          <p className="cart-description-text">
                            <span className="cart-description-img-text">Usuario: </span>
                            {x.photographer.name + " " + x.photographer.lastName}
                          </p>
                          <p className="cart-description-text">
                            <span className="cart-description-img-text">Valor ARS: </span>
                            {x.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="cart-bottom">
                  <div className="cart-bottom-line"></div>
                  <div className="cart-bottom-price-group">
                    <p className="cart-bottom-price">
                      Total: <span className="cart-bottom-price-nmb">ARS {total}</span>
                    </p>
                    {isLogged ? (
                      <a className="cart-btn" href={state}>
                        Comprar
                      </a>
                    ) : (
                      <Link to="/login" className="cart-btn">
                        Logueate para Comprar
                      </Link>
                    )}
                    <button onClick={() => dispatch(cleanCart())} className="cart-btn remove">
                      Borrar Carro
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to={allImages.length > 0 ? `/details/${allImages[0]._id}` : null} className="cart-btn-explore">
            Explorar más
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div>
            <span className="cart-title">Tu carrito está vacío</span>
            <div className="cart-group">
              <div className="cart-left">
                <div className="cart-group-panel">
                  <div className="cart-panel">
                    <p className="cart-panel-title">Carrito</p>
                    <p className="cart-panel-number">{cart.length}</p>
                  </div>
                  <div className="cart-panel">
                    <p className="cart-panel-title">Guardados</p>
                    <p className="cart-panel-number">{details.favorites.length}</p>
                  </div>
                </div>
                <div className="cart-bottom">
                  <p className="cart-bottom-text">¿No sabés qué comprar? ¡Miles de fotos te esperan!</p>
                  <Link to="/login" className="cart-btn">
                    Explorar más
                  </Link>
                </div>
              </div>
              <img src={cartImage} alt="cart-img" className="cart-image" />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
