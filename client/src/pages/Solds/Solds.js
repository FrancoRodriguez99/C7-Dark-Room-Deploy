import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import { VictoryLabel, VictoryPie, VictoryTheme } from "victory";
import WithdrawalForm from "../../components/WithdrawalForm/WithdrawalForm";
import Modal from "react-modal";

export default function Solds() {
  Modal.setAppElement("#root");
  const currentUser = useSelector((state) => state.userLoged.currentUser);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState([]);
  const [statsRetos, setStatsRetos] = useState([]);
  const [filteredStats, setFilteredStats] = useState({ masVendido: [], masProfit: [], toWhitdraw: 0, gananciasRetos: [], idsToWhidrawSales: [], idsToWhidrawRetos: [] });
  useEffect(() => {
    async function t(id) {
      await fetch(`https://deploy-api-c7-dark-room.onrender.com/api/mercadopago/soldStats/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((d) => {
          setStats(d.arrayComprobante);
          setStatsRetos(d.arrayChallenge);
        })
        .catch((e) => e);
    }
    if (currentUser._id) {
      t(currentUser._id);
    }
  }, []);

  useEffect(() => {
    var photosSoldIds = stats.map((x) => x.photo_id._id);
    photosSoldIds = [...new Set(photosSoldIds)];
    var masVendidos = photosSoldIds.map(() => 0);
    var MayorProfit = photosSoldIds.map(() => 0);
    var titulos = [];
    var toWhitdraw = 0;
    stats.forEach((boleta) => {
      let indiceFoto = photosSoldIds.indexOf(boleta.photo_id._id);
      MayorProfit[indiceFoto] = boleta.payment_status === "approved" ? parseFloat(boleta.photo_price) + parseFloat(masVendidos[indiceFoto]) : masVendidos[indiceFoto];
      masVendidos[indiceFoto] = boleta.payment_status === "approved" ? masVendidos[indiceFoto] + 1 : masVendidos[indiceFoto];
      toWhitdraw = boleta.payment_status === "approved" && !boleta.cashed_out ? toWhitdraw + parseFloat(boleta.photo_price) : toWhitdraw;
      titulos[indiceFoto] = boleta.photo_id.title;
    });

    var gananciasPorRetos = 0;
    statsRetos.forEach((x) => (gananciasPorRetos = gananciasPorRetos + parseFloat(x.price)));
    statsRetos.forEach((x) => (toWhitdraw = x.cashed_out ? toWhitdraw : toWhitdraw + parseFloat(x.price)));

    const idsToWhidrawSales = stats.filter((x) => !x.cashed_out);
    const idsToWhidrawRetos = statsRetos.filter((x) => !x.cashed_out);

    setFilteredStats({
      masVendido: titulos.map((t, i) => {
        return { x: t, y: masVendidos[i] };
      }),
      masProfit: titulos.map((t, i) => {
        return { x: t, y: MayorProfit[i] };
      }),
      gananciasRetos: { x: "Retos", y: gananciasPorRetos },
      idsToWhidrawRetos,
      idsToWhidrawSales,
      toWhitdraw,
    });
  }, [stats]);

  function handleWhitdraw() {
    setIsOpen(true);
  }

  return (
    <div>
      <div id="container_retos_navbar">
        <div id="navbar_retos">
          <Navbar />
        </div>
      </div>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <div>
          <div></div>
          <div style={{ width: "600px", height: "600px" }}>
            <svg viewBox="0 0 400 400">
              <VictoryPie standalone={false} width={400} height={400} data={filteredStats.masVendido} theme={VictoryTheme.material} innerRadius={68} labelRadius={100} style={{ labels: { fontSize: 20, fill: "Black" } }} />
              <VictoryLabel textAnchor="middle" style={{ fontSize: 20 }} x={200} y={200} text="Mas Vendido" />
            </svg>
          </div>
        </div>
        <div>
          <div></div>
          <div style={{ width: "600px", height: "600px" }}>
            <svg viewBox="0 0 400 400">
              <VictoryPie
                standalone={false}
                width={400}
                height={400}
                data={[...filteredStats.masProfit, filteredStats.gananciasRetos]}
                theme={VictoryTheme.material}
                innerRadius={68}
                labelRadius={100}
                style={{ labels: { fontSize: 20, fill: "Black" } }}
              />
              <VictoryLabel textAnchor="middle" style={{ fontSize: 20 }} x={200} y={200} text="Mas Ganancias" />
            </svg>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <button className="input-submit" style={{ fontSize: "30px" }} onClick={() => handleWhitdraw()}>
          {filteredStats.toWhitdraw > 0 ? `Retirar las ganancias por: ${filteredStats.toWhitdraw}` : "Ya se retiraron todas las ganancias"}
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            zIndex: 3,
          },
          overlay: { zIndex: 1000 },
        }}
      >
        <WithdrawalForm setIsOpen={setIsOpen} total={filteredStats.toWhitdraw} idUser={currentUser._id} publicationsSales={filteredStats.idsToWhidrawSales} retosSales={filteredStats.idsToWhidrawRetos} />
      </Modal>
    </div>
  );
}
