import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/photosActions";
import { Link } from "react-router-dom";
import Group from "./../../assets/Group.png";
import "./Navbar.css";
import { logOut } from "../../redux//slices/usersLogedSlice";
// import Notificaciones from './../../assets/Vector.png';
// import Subir from './../../assets/iTETAH.tif_1_.png';
// import Carrito from './../../assets/carrito.png';

export default function Navbar() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.userLoged.currentUser);

  const handleLogout = () => {
    dispatch(logoutAction());
    dispatch(logOut());
  };

  window.addEventListener("scroll", function () {
    if (document.documentElement.scrollTop > 500) {
      document.querySelector(".navbar_component")?.classList.add("active");
    } else {
      document.querySelector(".navbar_component")?.classList.remove("active");
    }
  });

  return (
    <div className="navbar_component">
      <div className="navbar-general">
        <Link to="/" className="navbar-container-img">
          <img className="navbar-img" src={Group} alt="sadasd" />
        </Link>

        <div className="navbar-container-link">
          <Link className="navbar-link">Categorias</Link>
          <Link className="navbar-link" to="/publish">
            Subir
          </Link>

          <Link to="/cart" className="navbar-link">
            Carrito
          </Link>

          {currentUser.email ? (
            <div className="navbar_drawer">
              <div className="navbar_divAvatar">
                <img src={currentUser.avatar} alt="" />
              </div>
              <div>
                <div className="navbar_menuModal">
                  <Link to={`/profile/${currentUser._id}`} className="">
                    ver perfil
                  </Link>
                  <span className="navbar_logOut" onClick={handleLogout}>
                    cerrar sesion
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <Link className="navbar-link" to="/login">
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
