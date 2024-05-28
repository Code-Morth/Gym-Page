'use client'
import React from "react"

const AgregarCliente = () => {

    const handleLogin = (event: any) => {

        event.preventDefault()
    
        const dataForm = Object.fromEntries(new FormData(event.target))

        console.log(dataForm)
    
      }

  return (
    <div className="AgregarCliente">
      <div className="agregar-cliente-container">
        <h1>Registro de cliente</h1>
        <form onSubmit={handleLogin} className="form-container">
          <div className="data-container">
            <div className="form-left">
              <label htmlFor="userName">Nombre de usuario</label>
              <input required name="userName" type="text" />
              <label htmlFor="secondSurname">Segundo apellido</label>
              <input name="secondSurname" type="text" />
              <label htmlFor="telephone">Telefono</label>
              <input required name="telephone" type="number" />
              <label htmlFor="membership">Membresia</label>
              <input name="membership" type="text" />
            </div>
            <div className="form-rigth">
              <label htmlFor="firstSurname">Primer apellido</label>
              <input name="firstSurname" type="text" />
              <label htmlFor="email">Correo</label>
              <input required name="email" type="email" />
              <label htmlFor="address">Direccion</label>
              <input name="address" type="text" />
            </div>
          </div>
          <button className="button-default">Agregar cliente</button>
        </form>
      </div>
    </div>
  )
}

export default AgregarCliente
