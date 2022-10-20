import { useState } from "react";
import { crearReto } from "../../redux/actions/photosActions";

export default function AddReto() {
  const defaultState = {
    title: { value: "", error: true },
    descripcion: { value: "", error: true },
    ends: { value: "", error: true },
    price: { value: "", error: true },
  };
  const [formulario, setFormulario] = useState(defaultState);

  function handleTitle(e) {
    setFormulario({ ...formulario, title: { value: e.target.value, error: false } });
  }
  function handleDescription(e) {
    setFormulario({ ...formulario, descripcion: { value: e.target.value, error: false } });
  }
  function handleEnds(e) {
    if (new Date(e.target.value) > new Date(Date.now())) {
      setFormulario({ ...formulario, ends: { value: e.target.value, error: false } });
    } else {
      setFormulario({ ...formulario, ends: { value: e.target.value, error: "La fecha debe ser en el futuro" } });
    }
  }
  function handlePrice(e) {
    setFormulario({ ...formulario, price: { value: e.target.value, error: false } });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!formulario.title.error || !formulario.descripcion.error || !formulario.ends.error || !formulario.price.error) {
      const a = await crearReto(formulario);
    }
  }

  //le puso el color negro de fondo y width y height al 100%, porque tener la pagina en blanco me mata los ojos saquenselo cuando lo implementen
  return (
    <form onSubmit={(e) => handleSubmit(e)} style={{ background: "black", width: "100%", height: "100vh" }}>
      <input placeholder="title" onChange={(e) => handleTitle(e)} value={formulario.title.value}></input>
      <input placeholder="descripcion" onChange={(e) => handleDescription(e)} value={formulario.descripcion.value}></input>
      <input placeholder="ends" type="date" onChange={(e) => handleEnds(e)} value={formulario.ends.value}></input>
      {formulario.ends.error ? <div style={{ background: "pink" }}>{formulario.ends.error}</div> : null}
      <input placeholder="price" type="number" onChange={(e) => handlePrice(e)} value={formulario.price.value}></input>
      <button disabled={formulario.title.error || formulario.descripcion.error || formulario.ends.error || formulario.price.error}>Crear</button>
    </form>
  );
}
