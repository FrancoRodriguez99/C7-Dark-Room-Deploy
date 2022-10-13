import React, { useEffect, useState } from "react";
import "./Search.css";
import Lupa from "./../../assets/Lupa.png";
import Gris from "./../../assets/gris.jpg";
import Filter from "./../../assets/filter.png";
import { getDataForFiltering } from "../../redux/actions/photosActions";
import { useDispatch } from "react-redux";

export default function Search() {
  const dispatch = useDispatch();
  const [deploySearch, setDeploySearch] = useState(false);

  const inputDeploy = () => {
    setDeploySearch(!deploySearch);
  };

  const [filter, setFilter] = useState({
    priceRange: { min: null, max: null, pay: null },
    ubication: null,
    reto: null,
    title: null,
    caract: null,
  });

  function handleChange(e) {
    setFilter({
      ...filter,
      title: e.target.value.length > 0 ? e.target.value : null,
    });
  }

  useEffect(() => {
    dispatch(getDataForFiltering(filter));
  }, [filter, dispatch]);

  return (
    <div className="search-total">
      {deploySearch ? (
        <div className="search-container-input">
          <div className="search-general-back">
            <input
              onClick={inputDeploy}
              onChange={handleChange}
              type="text"
              className="search-input"
            />
            <img src={Lupa} className="search-icon" alt="sadasd" />
            <button className="search-button">Buscar</button>
            <div className="search-container-p">
              <p className="search-p">
                Descarga gratis, compra, vende, emprende{" "}
              </p>
            </div>
            <div className="search-div">
              <div className="search-div-filter">
                <button className="search-div-button">
                  <img src={Filter} alt="sadasd" />
                  &nbsp;Filtro
                </button>
                <div className="search-div-category">
                  <p className="search-div-category-p">Categorias</p>
                </div>
                <div className="search-hr-div">
                  <hr className="search-hr" />
                </div>
                <div className="search-card">
                  <div className="search-card-total">
                    <img
                      alt="sadasd"
                      src={Gris}
                      className="search-card-total-img"
                    />
                    <p className="search-card-total-p">&nbsp;Colores</p>
                  </div>
                  <div className="search-card-total">
                    <img
                      alt="sadasd"
                      src={Gris}
                      className="search-card-total-img"
                    />
                    <p className="search-card-total-p">&nbsp;Colores</p>
                  </div>
                  <div className="search-card-total">
                    <img
                      alt="sadasd"
                      src={Gris}
                      className="search-card-total-img"
                    />
                    <p className="search-card-total-p">&nbsp;Colores</p>
                  </div>
                  <div className="search-card-total">
                    <img
                      alt="sadasd"
                      src={Gris}
                      className="search-card-total-img"
                    />
                    <p className="search-card-total-p">&nbsp;Colores</p>
                  </div>
                </div>
                <div className="search-card">
                  <div className="search-card-total">
                    <img
                      alt="sadasd"
                      src={Gris}
                      className="search-card-total-img"
                    />
                    <p className="search-card-total-p">&nbsp;Colores</p>
                  </div>
                  <div className="search-card-total">
                    <img
                      alt="sadasd"
                      src={Gris}
                      className="search-card-total-img"
                    />
                    <p className="search-card-total-p">&nbsp;Colores</p>
                  </div>
                  <div className="search-card-total">
                    <img
                      alt="sadasd"
                      src={Gris}
                      className="search-card-total-img"
                    />
                    <p className="search-card-total-p">&nbsp;Colores</p>
                  </div>
                  <div className="search-card-total">
                    <img
                      alt="sadasd"
                      src={Gris}
                      className="search-card-total-img"
                    />
                    <p className="search-card-total-p">&nbsp;Colores</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="search-container-input">
          <div className="search-general-back">
            <input
              onClick={inputDeploy}
              type="text"
              className="search-input"
            ></input>
            <img src={Lupa} className="search-icon" alt="asdas" />
            <button className="search-button">Buscar</button>
            <div className="search-container-p">
              <p className="search-p">
                Descarga gratis, compra, vende, emprende{" "}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
