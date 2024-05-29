"use client";
import apisPeticion from "@/api/apisPeticion";
import React, { useRef } from "react";
import { baseApi } from "@/../lib/baseApi";
import getConfig from "@/../utils/getConfig";
import { useAlerts } from "../../../hook/useAlerts";
import { Toast } from "primereact/toast";

const AgregarUsuarios = () => {
  const { postUser } = apisPeticion();
  const dataRef = useRef<any>(null);
  const { show, toast } = useAlerts();

  const handleLogin = (event: any) => {
    event.preventDefault();

    const dataForm = Object.fromEntries(new FormData(event.target));

    console.log("dataForm",dataForm)

    baseApi
      .post(`${postUser}`, dataForm, getConfig())
      .then((res) => {
        if (res.data.success) {
          show("Usuario Creado Exitosamente");
          dataRef.current.reset();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="AgregarUsuarios">
      <div className="agregar-usuarios-container">
        <h1>Agregar Usuario</h1>
        <form ref={dataRef} onSubmit={handleLogin} className="form-container">
          <div className="data-container">
            <div className="form-left">
              <label htmlFor="userName">Nombre de usuario</label>
              <input required name="username" type="text" />
              <label htmlFor="firstSurname">Primer apellido</label>
              <input required name="last_name1" type="text" />
              <label htmlFor="email">Email</label>
              <input required name="email" type="email" />
              <label htmlFor="finalDate">Fecha final</label>
              <input required name="final_date" type="date" />
              <label htmlFor="closingHour">Horario de salida</label>
              <input required name="final_time" type="time" />
              <label htmlFor="address">Direccion</label>
              <input required name="address" type="text" />
              <label htmlFor="salary">Sueldo</label>
              <input required name="income" type="number" />
            </div>
            <div className="form-rigth">
              <label htmlFor="fullName">Nombre completo</label>
              <input required name="first_name" type="text" />
              <label htmlFor="secondSurname">Segundo apellido</label>
              <input required name="last_name2" type="text" />
              <label htmlFor="startDate">Fecha inicio</label>
              <input required name="initial_date" type="date" />
              <label htmlFor="entryTime">Horario entrada</label>
              <input required name="initial_time" type="time" />
              <label htmlFor="ci">Ci</label>
              <input required name="ci" type="text" />
              <label htmlFor="password">Contraseña</label>
              <input required name="password" type="password" />
              <label htmlFor="userType">Rol</label>
              <input required name="fk_typeuser" type="text" />
            </div>
          </div>
          <button className="button-default">Agregar usuario</button>
        </form>
      </div>
      <Toast ref={toast} position="top-center" />
    </div>
  );
};

export default AgregarUsuarios;
