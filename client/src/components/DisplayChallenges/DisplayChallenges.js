import logo from "../../assets/logo-login.png";
import "./DisplayChallenges.css";
import Modal from "react-modal";
import Details from "../../pages/Details/Details";
import { useState } from "react";

export default function DisplayChallenges({ x }) {
  function calculateWinner() {
    var array = [...x.participants];
    array = array.sort((a, b) => b.challengeLikes.length - a.challengeLikes.length);

    return array;
  }
  const [modalIsOpen, setIsOpen] = useState(false);
  const [IdForModal, setIdForModal] = useState("");

  Modal.setAppElement("#root");

  const winnersSoFar = calculateWinner();

  return (
    <div className="container_reto">
      <div className="winners_container_reto">
        <div className="reto_winner_so_far">
          <img
            src={winnersSoFar[0]?.url || "https://image.shutterstock.com/image-vector/prohibition-sign-no-photography-260nw-209270626.jpg"}
            alt="winner so far"
            onClick={() => {
              setIdForModal(winnersSoFar[0]._id);
              setIsOpen(true);
            }}
            style={{ width: "100%", height: "100%" }}
          />
          {new Date(x.ends) > new Date(Date.now()) ? null : (
            <>
              <div className="ganador_del_reto_likes">{winnersSoFar[0].challengeLikes.length} Likes</div> <div className="ganador_del_reto">Ganador</div>
            </>
          )}
        </div>
        <div>
          {winnersSoFar.map((x, index) => {
            if (index !== 0 && index < 5) return <img src={x.url} key={x._id} alt="almost winners" className="almost_winners_reto" onClick={() => setIsOpen(true)}></img>;
            return null;
          })}
        </div>
      </div>
      <div className="reto_datos_generales">
        <div>
          <div className="participa_reto">Participa en el reto del mes:</div> <div className="participa_reto_titulo">{x.title}</div>
        </div>
        <div className="quien_gana_reto">{x.description}</div>
        <div className="recompensa_reto">Gana los primeros lugares y consigue el premio de ${x.price}USD</div>
        <div className="fechas_container_reto">
          {new Date(x.ends) > new Date(Date.now()) ? (
            <>
              <div className="fechas_texto_reto">Comenzo el: {x.createdAt.split("T")[0]}</div>
              <div className="fechas_texto_reto">Termina el: {x.ends.split("T")[0]}</div>{" "}
            </>
          ) : (
            <div className="fechas_texto_reto_termino">Termino el: {x.ends.split("T")[0]}</div>
          )}
        </div>
      </div>
      <img src={logo} alt="logo" className="logo_retos_data"></img>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: { zIndex: 1000 },
        }}
      >
        <Details idFirstModal={IdForModal} setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
}
