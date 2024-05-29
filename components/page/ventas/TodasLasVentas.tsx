"use client"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import React, { useEffect, useState } from "react"
import todasLasVentas from "../../../json/todasLasVentas.json"

const TodasLasVentas = () => {
  const [customers, setCustomers] = useState<any>([])
  const [dateStart, setdateStart] = useState<any>()
  const [dateEnd, setdateEnd] = useState<any>()

  useEffect(() => {
    setCustomers(todasLasVentas)
  }, [])

  console.log("dateStart", dateStart)
  console.log("dateEnd", dateEnd)

  return (
    <>
      <div className="TodasLasVentas">
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
                field="totalPrice"
                header="Precio total"
                style={{ width: "8%" }}
              ></Column>
              <Column
                className="column"
                field="saleDate"
                header="Fecha de Venta"
                style={{ width: "8%" }}
              ></Column>
              <Column
                className="column"
                field="clientName"
                header="Nombre del cliente"
                style={{ width: "10%" }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodasLasVentas
