import React, { useEffect, useState } from "react";
import "./Search.css";
import Lupa from "./../../assets/Lupa.png";
import Colores from './../../assets/Frame24.png';
import Texturas from './../../assets/Frame26.png';
import Tecnologias from './../../assets/Frame27.png';
import Naturaleza from './../../assets/Frame28.png';
import Dark from './../../assets/Frame29.png';
import Autos from './../../assets/Frame32.png';
import Arquitectura from './../../assets/Frame30.png';
import Astronomia from './../../assets/Frame31.png';
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

  function handleChangeColores() {
    setFilter({
      ...filter,
      title: "colores",
    });
    setDeploySearch(!deploySearch);
  }

  function handleChangeTextura() {
    setFilter({
      ...filter,
      title: "textura",
    });
    setDeploySearch(!deploySearch);
  }

  function handleChangeTecnologia() {
    setFilter({
      ...filter,
      title: "tecnologia",
    });
    setDeploySearch(!deploySearch);
  }

  function handleChangeNaturaleza() {
    setFilter({
      ...filter,
      title: "naturaleza",
    });
    setDeploySearch(!deploySearch);
  }

  function handleChangeDark() {
    setFilter({
      ...filter,
      title: "dark",
    });
    setDeploySearch(!deploySearch);
  }

  function handleChangeArquitectura() {
    setFilter({
      ...filter,
      title: "arquitectura",
    });
    setDeploySearch(!deploySearch);
  }

  function handleChangeAutos() {
    setFilter({
      ...filter,
      title: "autos",
    });
    setDeploySearch(!deploySearch);
  }

  function handleChangeAstronomia() {
    setFilter({
      ...filter,
      title: "astronomia",
    });
    setDeploySearch(!deploySearch);
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
              onBlur={inputDeploy}
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
                  <img src={Filter} alt="filtro" />
                  &nbsp;Filtro
                </button>
                <div className="search-div-category">
                  <p className="search-div-category-p">Categorias</p>
                </div>
                <div className="search-hr-div">
                  <hr className="search-hr" />
                </div>
                <div className="search-card">
                  <div className="search-card-total" onClick={handleChangeColores}
                  >
                    <img
                      alt="sadasd"
                      src={Colores}
                      className="search-card-total-img"
                    />
                    <p className="search-card-total-p">&nbsp;Colores</p>
                  </div>
                  <div className="search-card-total" onClick={handleChangeTextura}>
                    <img
                      alt="sadasd"
                      src={Texturas}
                      className="search-card-total-img"
                    />
                    <p className="search-card-total-p">&nbsp;Textura</p>
                  </div>
                  <div className="search-card-total" onClick={handleChangeTecnologia}>
                    <img
                      alt="sadasd"
                      src={Tecnologias}
                      className="search-card-total-img"
                    />
                    <p className="search-card-total-p">&nbsp;Tecnologia</p>
                  </div>
                  <div className="search-card-total" onClick={handleChangeNaturaleza}>
                    <img
                      alt="sadasd"
                      src={Naturaleza}
                      className="search-card-total-img"
                    />
                    <p className="search-card-total-p">&nbsp;Naturaleza</p>
                  </div>
                </div>
                <div className="search-card">
                  <div className="search-card-total" onClick={handleChangeDark}>
                    <img
                      alt="sadasd"
                      src={Dark}
                      className="search-card-total-img"
                    />
                    <p className="search-card-total-p">&nbsp;Dark</p>
                  </div>
                  <div className="search-card-total" onClick={handleChangeArquitectura}>
                    <img
                      alt="sadasd"
                      src={Arquitectura}
                      className="search-card-total-img"
                    />
                    <p className="search-card-total-p">&nbsp;Arquitectura</p>
                  </div>
                  <div className="search-card-total" onClick={handleChangeAstronomia}>
                    <img
                      alt="sadasd"
                      src={Astronomia}
                      className="search-card-total-img"
                    />
                    <p className="search-card-total-p">&nbsp;Astronomia</p>
                  </div>
                  <div className="search-card-total" onClick={handleChangeAutos}>
                    <img
                      alt="sadasd"
                      src={Autos}
                      className="search-card-total-img"
                    />
                    <p className="search-card-total-p">&nbsp;Autos</p>
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



