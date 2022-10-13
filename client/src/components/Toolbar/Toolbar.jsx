import React from 'react'
import { Link } from 'react-router-dom'
import './Toolbar.css'

export default function Toolbar() {
  return (
    <div>
      <div className="toolbar-general">
        <Link className="toolbar-link">Reto del mes</Link>
        <Link className="toolbar-link">Mejor calificado</Link>
        <Link className="toolbar-link">Guardados</Link>
      </div>
    </div>
  )
}
