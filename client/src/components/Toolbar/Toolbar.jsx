import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDataForFiltering } from "../../redux/actions/photosActions";
import "./Toolbar.css";

export default function Toolbar() {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    priceRange: { min: null, max: null, pay: null },
    ubication: null,
    reto: null,
    title: null,
    caract: null,
    cal: false,
  });

  useEffect(() => {
    dispatch(getDataForFiltering(filter));
  }, [filter, dispatch]);
  return (
    <div>
      <div className="toolbar-general">
        <Link className="toolbar-link" onClick={() => setFilter({ ...filter, reto: true })}>
          Retos
        </Link>
        <Link
          className="toolbar-link"
          onClick={() =>
            setFilter({
              priceRange: { min: null, max: null, pay: null },
              ubication: null,
              reto: null,
              title: null,
              caract: null,
              cal: false,
            })
          }
        >
          Todo
        </Link>
        <Link className="toolbar-link" onClick={() => setFilter({ ...filter, cal: true })}>
          Mejor calificado
        </Link>
      </div>
    </div>
  );
}
