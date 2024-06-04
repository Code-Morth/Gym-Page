"use client"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import React, { useEffect, useState } from "react"
import axios from "axios"
import apisPeticion from "@/api/apisPeticion"
import getConfig from "../../../utils/getConfig"
import dayjs from "dayjs"

const TodasLasVentas = () => {
  const actualDate = dayjs().format("DD-MM-YYYY")
  const datePlusOneMonth = dayjs().add(1, "month").format("DD-MM-YYYY")
  const [customers, setCustomers] = useState<any>([])
  const [dateStart, setdateStart] = useState<any>(actualDate)
  const [dateEnd, setdateEnd] = useState<any>(datePlusOneMonth)
  const { url } = apisPeticion()

  const dateStartFormat = dayjs(dateStart).format("DD-MM-YYYY")
  const dateEndFormat = dayjs(dateEnd).format("DD-MM-YYYY")

  const searchByDate = () => {
    axios
      .get(
        `${url}/order?page=0&size=999999999999999&order_date_ini=${dateStartFormat}&order_date_end=${dateEndFormat}`,
        getConfig()
      )
      .then((res) => {
        console.log(res.data.data)
        setCustomers(res.data.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    axios
      .get(`${url}/order?page=0&size=999999999999999`, getConfig())
      .then((res) => {
        console.log(res.data.data)
        setCustomers(res.data.data)
      })
      .catch((err) => console.log(err))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const firstNameColumn = (data: any) => {
    return (
      <span>{`${data.client[0].first_name} ${data.client[0].last_name1} ${data.client[0].last_name2}`}</span>
    )
  }

  const totalProducts = (data: any) => {
    const newData = data.detail.map((e: any) => e.product_name)

    console.log(newData)

    return newData.map((name: any, index: any) => (
      <span key={index}>{`${name} ${
        index === newData.length - 1 ? "" : " - "
      }`}</span>
    ))
  }

  return (
    <>
      <div className="TodasLasVentas main-page">
        <div className="todas-las-ventas-container">
          <h1 className="tittle">Lista de Ventas</h1>
          <div className="dates-container">
            <h1>Fecha de inicio </h1>
            <input
              onChange={(e: any) => setdateStart(e.target.value)}
              type="date"
            />
            <h1>Fecha fin</h1>
            <input
              onChange={(e: any) => setdateEnd(e.target.value)}
              type="date"
            />
            <button onClick={searchByDate}>Buscar</button>
          </div>
          <div className="tabla-container">
            <DataTable
              className="data-table"
              value={customers}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                className="column"
                field="product"
                header="Productos"
                style={{ width: "8%" }}
                body={totalProducts}
              ></Column>
              <Column
                className="column"
                field="order_total"
                header="Precio total"
                style={{ width: "8%" }}
              ></Column>
              <Column
                className="column"
                field="order_date"
                header="Fecha de Venta"
                style={{ width: "8%" }}
              ></Column>
              <Column
                className="column"
                field="first_name"
                header="Nombre del cliente"
                style={{ width: "10%" }}
                body={firstNameColumn}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodasLasVentas
