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
  const [membershipSelected, setmembershipSelected] = useState<any>()
  const [finalDate, setfinalDate] = useState<any>()
  const [customers, setCustomers] = useState<any>([])
  const [quoteNumber, setquoteNumber] = useState(0)

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

    axios
      .get(`${url}/client?page=0&size=99999999`, getConfig())
      .then((res) => setCustomers(res.data.data))
      .catch((err) => console.log(err))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (event: any) => {
    event.preventDefault()

    const dataForm: any = Object.fromEntries(new FormData(event.target))

    delete dataForm.price
    delete dataForm.initial_date
    delete dataForm.final_date
    delete dataForm.number_entries
    delete dataForm.permissions
    dataForm.ammount = quoteNumber

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

  const handleMembreshipChange = (event: any) => {
    const selectedId = event.target.value
    const selectedMembreship = memberShip.find(
      (item: any) => item.id === selectedId
    )

    axios
      .get(`${url}/membership/${selectedMembreship.id}`, getConfig())
      .then((res) => {
        setmembershipSelected(res.data.data), console.log("res", res.data.data)
      })
      .catch((err) => console.log(err))
  }

  const handleDate = (event: any) => {
    const date = new Date(event.target.value)

    date.setDate(date.getDate() + membershipSelected?.duration + 1)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0") // Los meses en JavaScript son base 0
    const day = String(date.getDate()).padStart(2, "0")

    setfinalDate(`${month}/${day}/${year}`)
  }

  const changeAmountQuote = (data: any) => {
    if (data.target.value >= Number(membershipSelected?.price ?? 0)) {
      const stringMoment = (membershipSelected?.price ?? 0).toString()

      const numberMoment = Number(stringMoment)

      setquoteNumber(numberMoment)
    }

    if (data.target.value <= 0) setquoteNumber(0)
    if (
      data.target.value > 0 &&
      data.target.value < Number(membershipSelected?.price ?? 0)
    ) {
      const stringMoment = data.target.value.toString()

      const numberMoment = Number(stringMoment)

      setquoteNumber(numberMoment)
    }
  }

  useEffect(() => {
    setquoteNumber(0)
  }, [membershipSelected])

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
              <select
                onChange={handleMembreshipChange}
                required
                name="fk_membership"
                id=""
              >
                <option value="">Seleccione su membresia</option>
                {memberShip?.map((data: any) => (
                  <option key={data.id} value={data.id}>
                    {data?.name}
                  </option>
                ))}
              </select>
              <label htmlFor="price">Precio</label>
              <input
                required
                readOnly
                value={membershipSelected?.price ?? "0"}
                name="price"
                type="text"
              />
              <label htmlFor="initial_date">Desde</label>
              <input
                onChange={handleDate}
                required
                name="initial_date"
                type="date"
              />
              <label htmlFor="permissions">Permisos</label>
              <input
                required
                readOnly
                value={membershipSelected?.permission ?? "0"}
                name="permissions"
                type="text"
              />
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
              <label htmlFor="final_date">Hasta</label>
              <input value={finalDate} readOnly name="final_date" type="text" />
              <label htmlFor="number_entries">Numero de entradas</label>
              <input
                required
                readOnly
                value={membershipSelected?.duration ?? "0"}
                name="number_entries"
                type="text"
              />
              <label htmlFor="ammount">Pago</label>
              <input
                onChange={changeAmountQuote}
                value={quoteNumber}
                required
                name="ammount"
                type="number"
              />
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
