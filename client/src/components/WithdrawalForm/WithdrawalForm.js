import { useState } from "react";
import "./WithdrawalForm.css";

export default function WithdrawalForm({ total, idUser, publicationsSales, retosSales }) {
  const [datosBanco, setDatosBanco] = useState({ cbu: "", alias: "", banco: "", error: false, loading: false, complete: false });

  async function handleSubmit(e) {
    e.preventDefault();
    if (datosBanco.cbu && datosBanco.alias && datosBanco.banco) {
      setDatosBanco({ ...datosBanco, loadin: true });
      await fetch(`https://deploy-api-c7-dark-room.onrender.com/api/mercadopago/whitdraw/${idUser}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ total, publicationsSales, retosSales, dataToPay: datosBanco }),
      })
        .then((response) => response.json())
        .then((d) => {
          setDatosBanco({ loading: true, complete: true });
        })
        .catch((e) => e);
    } else {
      setDatosBanco({ ...datosBanco, error: true });
    }
  }

  return (
    <form className="whidrawlModal">
      <div className="formdiv">Ganacias a Retirar: {total}</div>
      <input placeholder="CBU" required className="formdiv" onChange={(e) => setDatosBanco({ ...datosBanco, cbu: e.target.value })}></input>
      <input placeholder="Alias" required className="formdiv" onChange={(e) => setDatosBanco({ ...datosBanco, alias: e.target.value })}></input>
      <input placeholder="Banco" required className="formdiv" onChange={(e) => setDatosBanco({ ...datosBanco, banco: e.target.value })}></input>
      {datosBanco.complete ? (
        <div>Ganancias solicitadas correctamentes, este proceso puede demorar 72hs</div>
      ) : (
        <button className="formdiv" onClick={(e) => handleSubmit(e)}>
          {datosBanco.loading ? "Cargando..." : datosBanco.error ? "Completa todos campos" : "Solicitar Retiro"}
        </button>
      )}
    </form>
  );
}
