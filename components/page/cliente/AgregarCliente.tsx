"use client"
import React, { useEffect, useRef, useState } from "react"
import apisPeticion from "@/api/apisPeticion"
import getConfig from "../../../utils/getConfig"
import { useAlerts } from "../../../hook/useAlerts"
import { Toast } from "primereact/toast"
import axios from "axios"

const AgregarCliente = () => {
  const { url } = apisPeticion()
  const dataRef = useRef<any>(null)
  const { show, toast } = useAlerts()
  const [memberShip, setmemberShip] = useState<any>()

  useEffect(() => {
    axios
      .get(`${url}/membership`, getConfig())
      .then((res) => {
        const transformedData = res.data.data
          .map((item: any) => ({
            name: item.name,
            id: item.id.toString(),
            status: item.status,
          }))
          .filter((data: any) => data.status === "active")
        setmemberShip(transformedData)
      })
      .catch((err) => console.log(err))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log("memberShip", memberShip)

  const handleLogin = (event: any) => {
    event.preventDefault()

    const dataForm = Object.fromEntries(new FormData(event.target))

    console.log("dataForm",dataForm)

    axios
      .post(`${url}/client`, dataForm, getConfig())
      .then((res) => {
        if (res.data.success) {
          show("Usuario Creado Exitosamente")
          dataRef.current.reset()
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="AgregarCliente main-page">
      <div className="agregar-cliente-container">
        <h1>Registro de cliente</h1>
        <form ref={dataRef} onSubmit={handleLogin} className="form-container">
          <div className="data-container">
            <div className="form-left">
              <label htmlFor="first_name">Nombre de usuario</label>
              <input required name="first_name" type="text" />
              <label htmlFor="last_name2">Segundo apellido</label>
              <input name="last_name2" type="text" />
              <label htmlFor="phone">Telefono</label>
              <input required name="phone" type="number" />
              <label htmlFor="fk_membership">Membresia</label>
              <select required name="fk_membership" id="">
                <option value="">Seleccione su membresia</option>
                {memberShip?.map((data: any) => (
                  <option key={data.id} value={data.id}>
                    {data?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-rigth">
              <label htmlFor="last_name1">Primer apellido</label>
              <input name="last_name1" type="text" />
              <label htmlFor="email">Correo</label>
              <input required name="email" type="email" />
              <label htmlFor="address">Direccion</label>
              <input name="address" type="text" />
              <label htmlFor="ci">Ci</label>
              <input required name="ci" type="number" />
            </div>
          </div>
          <button className="button-default">Agregar cliente</button>
        </form>
      </div>
      <Toast ref={toast} position="top-center" />
    </div>
  )
}

export default AgregarCliente
