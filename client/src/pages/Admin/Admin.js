import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div style={{ background: "black", display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh", flexDirection: "column" }}>
      <Link style={{ margin: "1em", background: "grey" }}>Bloquear/Desbloquear y dar Privilegios a Usuarios</Link> <Link style={{ margin: "1em", background: "grey" }}>Borrar Fotos </Link>{" "}
      <Link style={{ margin: "1em", background: "grey" }} to="/aceptarPago">
        Aceptar Pagos
      </Link>
    </div>
  );
}
