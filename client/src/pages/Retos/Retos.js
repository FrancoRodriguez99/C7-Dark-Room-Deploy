import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChallenges } from "../../redux/actions/photosActions";
import NavBar from "../../components/Navbar/Navbar";
import "./Retos.css";
import DisplayChallenges from "../../components/DisplayChallenges/DisplayChallenges";
import ArrowDown from "../../assets/ArrowDown.png";
export default function Retos() {
  const dispatch = useDispatch();

  const challenges = useSelector((state) => state.challenge);
  const [retosAMostrar, setRetosAMostrar] = useState(0);

  useEffect(() => {
    dispatch(getAllChallenges());
  }, [dispatch]);

  return (
    <div>
      <div id="container_retos_navbar">
        <NavBar />
      </div>
      <div id="label_retos_container">
        <div id="labels_retos">
          <div className="retos_boton_selected">Reto del mes</div>
          <div className="retos_boton">Mejor calificado</div>
          <div className="retos_boton">Guardados</div>
        </div>
      </div>
      <div className="allRetos_container">{challenges.allChalenges?.map((x, index) => (retosAMostrar >= index ? <DisplayChallenges key={x._id} x={x} /> : null))}</div>
      {retosAMostrar < challenges.allChalenges.length - 1 ? (
        <div id="retos_contenedor_de_la_flechita_del_orto">
          <div id="retos_flecha_ver_mas" onClick={() => setRetosAMostrar(retosAMostrar + 1)}>
            <img src={ArrowDown} alt="flecha abajo"></img>Ver más
          </div>
        </div>
      ) : null}
    </div>
  );
}
