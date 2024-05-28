"use client"
import apisPeticion from "@/api/apisPeticion";
import React from "react"

const AgregarUsuarios = () => {

  const { postUser } = apisPeticion();


  const handleLogin = (event: any) => {

    event.preventDefault()

    const dataForm = Object.fromEntries(new FormData(event.target))

  }

  return (
    <div className="AgregarUsuarios">
      <div className="agregar-usuarios-container">
        <h1>Agregar Usuario</h1>
        <form onSubmit={handleLogin} className="form-container">
          <div className="data-container">
            <div className="form-left">
              <label htmlFor="userName">Nombre de usuario</label>
              <input name="userName" type="text" />
              <label htmlFor="firstSurname">Primer apellido</label>
              <input name="firstSurname" type="text" />
              <label htmlFor="email">Email</label>
              <input name="email" type="email" />
              <label htmlFor="finalDate">Fecha final</label>
              <input name="finalDate" type="date" />
              <label htmlFor="closingHour">Horario de salida</label>
              <input name="closingHour" type="time" />
              <label htmlFor="address">Direccion</label>
              <input name="address" type="text" />
              <label htmlFor="salary">Sueldo</label>
              <input name="salary" type="number" />
            </div>
            <div className="form-rigth">
              <label htmlFor="fullName">Nombre completo</label>
              <input name="fullName" type="text" />
              <label htmlFor="secondSurname">Segundo apellido</label>
              <input name="secondSurname" type="text" />
              <label htmlFor="startDate">Fecha inicio</label>
              <input name="startDate" type="date" />
              <label htmlFor="entryTime">Horario entrada</label>
              <input name="entryTime" type="time" />
              <label htmlFor="ci">Ci</label>
              <input name="ci" type="text" />
              <label htmlFor="password">Contraseña</label>
              <input name="password" type="password" />
              <label htmlFor="userType">Rol</label>
              <input name="userType" type="text" />
            </div>
          </div>
          <button className='button-default'>Agregar usuario</button>
        </form>
      </div>
    </div>
  )
}

export default AgregarUsuarios
