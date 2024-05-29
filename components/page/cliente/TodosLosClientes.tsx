"use client"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import todosLosUsuarios from "../../../json/todosLosUsuarios.json"
import { useEffect, useState } from "react"
import apisPeticion from "@/api/apisPeticion"
import getConfig from "../../../utils/getConfig"
import axios from "axios"

const TodosLosClientes = () => {
  const [customers, setCustomers] = useState<any>([])
  const [memberShip, setmemberShip] = useState<any>()
  const { url } = apisPeticion()

  useEffect(() => {
    setCustomers(todosLosUsuarios)
  }, [])

  useEffect(() => {
    axios
      .get(`${url}/client`, getConfig())
      .then((res) => setCustomers(res.data.data))
      .catch((err) => console.log(err))

    axios
      .get(`${url}/membership`, getConfig())
      .then((res) => setmemberShip(res.data.data))
      .catch((err) => console.log(err))
  }, [])
  const filterCustomerExpired = customers.filter((user: any) => {
    const statusUser = user?.status !== "active"
    return statusUser
  })

  const filterCustomerActive = customers.filter((user: any) => {
    const statusUser = user?.status === "active"
    return statusUser
  })

  const accionUser = (rowData: any) => {
    return <button onClick={()=>console.log(rowData.id)}>Editar</button>
  }

  const columnMemberShip = (rowData: any) => {
    const filterMemberShip = memberShip?.filter((data: any) => {
      const member = data.id === rowData.fk_membership

      return member
    })

    return <span>{filterMemberShip[0].name}</span>
  }

  console.log("memberShip", memberShip)

  return (
    <div className="TodosLosClientes">
      <div className="todos-los-clientes-container">
        <input type="text" placeholder="Buscar cliente" />
        <div className="table-1">
          <h1>Clientes activos</h1>
          <div className="tabla-container">
            <DataTable
              className="data-table"
              value={filterCustomerActive}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                className="column"
                field="first_name"
                header="Nombre completo"
                style={{ width: "8%" }}
              ></Column>
              <Column
                className="column"
                field="last_name1"
                header="Primer apellido"
                style={{ width: "8%" }}
              ></Column>
              <Column
                className="column"
                field="last_name2"
                header="Segundo apellido"
                style={{ width: "8%" }}
              ></Column>
              <Column
                className="column"
                field="email"
                header="Correo electronico"
                style={{ width: "10%" }}
              ></Column>
              <Column
                className="column"
                field="fk_membership"
                header="Membresia"
                style={{ width: "10%" }}
                body={columnMemberShip}
              ></Column>
              <Column
                className="column"
                field="phone"
                header="Telefono"
                style={{ width: "10%" }}
              ></Column>
              <Column
                className="column"
                field="address"
                header="Direccion"
                style={{ width: "10%" }}
              ></Column>
              <Column
                className="column"
                field="createdAt"
                header="Fecha de registro"
                style={{ width: "10%" }}
              ></Column>
              <Column
                className="column"
                field="status"
                header="Estado de membresia"
                style={{ width: "10%" }}
              ></Column>
              <Column
                className="column"
                field="id"
                header="Acciones"
                style={{ width: "10%" }}
                body={accionUser}
              ></Column>
            </DataTable>
          </div>
        </div>
        <div className="table-2">
          <h1>Clientes expirados</h1>
          <div className="tabla-container">
            <DataTable
              className="data-table"
              value={filterCustomerExpired}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
            >
               <Column
                className="column"
                field="first_name"
                header="Nombre completo"
                style={{ width: "8%" }}
              ></Column>
              <Column
                className="column"
                field="last_name1"
                header="Primer apellido"
                style={{ width: "8%" }}
              ></Column>
              <Column
                className="column"
                field="last_name2"
                header="Segundo apellido"
                style={{ width: "8%" }}
              ></Column>
              <Column
                className="column"
                field="email"
                header="Correo electronico"
                style={{ width: "10%" }}
              ></Column>
              <Column
                className="column"
                field="fk_membership"
                header="Membresia"
                style={{ width: "10%" }}
                body={columnMemberShip}
              ></Column>
              <Column
                className="column"
                field="phone"
                header="Telefono"
                style={{ width: "10%" }}
              ></Column>
              <Column
                className="column"
                field="address"
                header="Direccion"
                style={{ width: "10%" }}
              ></Column>
              <Column
                className="column"
                field="createdAt"
                header="Fecha de registro"
                style={{ width: "10%" }}
              ></Column>
              <Column
                className="column"
                field="status"
                header="Estado de membresia"
                style={{ width: "10%" }}
              ></Column>
              <Column
                className="column"
                field="id"
                header="Acciones"
                style={{ width: "10%" }}
                body={accionUser}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodosLosClientes
