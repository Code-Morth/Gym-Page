"use client"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import React, { useEffect, useState } from "react"
import axios from "axios"
import apisPeticion from "@/api/apisPeticion"
import getConfig from "../../../utils/getConfig"

const TodasLasVentas = () => {
  const [customers, setCustomers] = useState<any>([])
  const [dateStart, setdateStart] = useState<any>('')
  const [dateEnd, setdateEnd] = useState<any>('')
  const { url } = apisPeticion()

  function formatDate(dateString: any) {
    const [year, month, day] = dateString.split("-")
    return `${day}-${month}-${year}`
  }

  const params = {
    order_date_ini: formatDate(dateStart),
    order_date_end: formatDate(dateEnd),
  }

  const config = getConfig()
  const configWithParams = {
    ...config,
    params,
  }

  useEffect(() => {   

    axios
      .get(`${url}/order?page=0&size=999999999999999`, configWithParams)
      .then((res) => {
        console.log(res.data.data)
        setCustomers(res.data.data)
      })
      .catch((err) => console.log(err))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const searchByDate = () =>{

    axios
      .get(`${url}/order?page=0&size=999999999999999`, configWithParams)
      .then((res) => {
        console.log(res.data.data)
        setCustomers(res.data.data)
      })
      .catch((err) => console.log(err))

  }

  console.log("dateStart", dateStart)
  console.log("dateEnd", dateEnd)
  console.log("customers", customers)

  const firstNameColumn = (data: any) => {
    return (
      <span>{`${data.client[0].first_name} ${data.client[0].last_name1} ${data.client[0].last_name2}`}</span>
    )
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
