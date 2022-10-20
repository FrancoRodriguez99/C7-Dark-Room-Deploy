import { useEffect } from "react";
import { getAllPhotosData } from "./../../redux/actions/photosActions";
import { useDispatch, useSelector } from "react-redux";
import HomeCards from "./../HomeCards/HomeCards";
import "./TotalCards.css";

export default function TotalCards() {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos.filterPhotosData);
  useEffect(() => {
    dispatch(getAllPhotosData());
  }, [dispatch]);
  return <div className="galery-container">{photos.length > 0 ? photos.map((x) => <HomeCards x={x} key={x._id} />) : null}</div>;
}
