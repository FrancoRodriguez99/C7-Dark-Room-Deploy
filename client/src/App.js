import "./App.css";
import CircleLoader from "react-spinners/CircleLoader";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Publish from "./pages/Publish/Publish";
import Cart from "./pages/Cart";
import Register from "./pages/Register/Register";
import Users from "./pages/Users/Users";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { localStorageCart } from "./redux/slices/cartSlice";
import LogIn from "./pages/LogIn/LogIn";
import Details from "./pages/Details/Details";
import Profile from "./pages/Profile/Profile";
import PostBuy from "./pages/PostBuy/PostBuy";
import { userCurrentAction, logoutAction } from "./redux/actions/photosActions";
import { logOut } from "./redux//slices/usersLogedSlice";
import LogInMobile from "./pages/LogInMobile/LogInMobile";
import UserScreen from "./pages/UserScreen/UserScreen";

function App() {
  const [loading, setLoading] = useState(false);
  const [checkCookie, setCheckCookie] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userLoged);

  useEffect(() => {
    dispatch(localStorageCart(JSON.parse(window.localStorage.getItem("cart"))));
  }, [dispatch]);

  useEffect(() => {
    async function t() {
      const a = await dispatch(userCurrentAction());
      if (
        a.payload.message === "No token provided" ||
        a.payload.message === "Unauthorized!"
      ) {
        dispatch(logOut());
        dispatch(logoutAction());
      }
    }
    t();
    setTimeout(() => setCheckCookie(!checkCookie), 20000);
  }, [checkCookie, dispatch]);

  /*
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);*/

  return (
    <div>
      {loading ? (
        <div className="loader">
          <CircleLoader color="#6C4494" size={90} loading={loading} />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/details/:id" element={<Details />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>

          {currentUser.loged ? (
            <>
              <Route path="/publish" element={<Publish />}></Route>
              <Route path="/postBuy" element={<PostBuy />}></Route>
            </>
          ) : (
            <>
              <Route path="/login" element={<UserScreen />}></Route>
              <Route path="/users" element={<Users />}></Route>
              <Route path="/register/:userType" element={<Register />}></Route>
              <Route path="/logInScreen" element={<LogIn />}></Route>
              <Route path="/publish" element={<LogIn />}></Route>
              <Route path="/postBuy" element={<LogIn />}></Route>
            </>
          )}
          <Route path="/loginMobile" element={<LogInMobile />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
