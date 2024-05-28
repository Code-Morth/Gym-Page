"use client"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import todosLosUsuarios from "../../../json/todosLosUsuarios.json"
import { useEffect, useState } from "react"

const TodosLosClientes = () => {
  const [customers, setCustomers] = useState<any>([])

  useEffect(() => {
    setCustomers(todosLosUsuarios)
  }, [])

  return (
    <div className="TodosLosClientes">
      <div className="todos-los-clientes-container">
        <div className="table-1">
          <h1>Clientes activos</h1>
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
                field="fullName"
                header="Nombre completo"
                style={{ width: "8%" }}
              ></Column>
              <Column
                className="column"
                field="firstSurname"
                header="Primer apellido"
                style={{ width: "8%" }}
              ></Column>
              <Column
                className="column"
                field="secondSurname"
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
                field="startDate"
                header="Fecha de inicio"
                style={{ width: "8%" }}
              ></Column>
              <Column
                className="column"
                field="finalDate"
                header="Fecha final"
                style={{ width: "8%" }}
              ></Column>
              <Column
                className="column"
                field="entryTime"
                header="Horario de entrada"
                style={{ width: "10%" }}
              ></Column>
              <Column
                className="column"
                field="closingHour"
                header="Horario de salida"
                style={{ width: "10%" }}
              ></Column>
              <Column
                className="column"
                field="ci"
                header="Numero de carnet"
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
                field="password"
                header="Contraseña"
                style={{ width: "10%" }}
              ></Column>
              <Column
                className="column"
                field="userType"
                header="Rol"
                style={{ width: "10%" }}
              ></Column>
              <Column
                className="column"
                field="actions"
                header="Acciones"
                style={{ width: "10%" }}
              ></Column>
            </DataTable>
          </div>
        </div>
        <div className="table-2">
          <h1>Clientes expirados</h1>
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
                field="fullName"
                header="Nombre completo"
                style={{ width: "8%" }}
              ></Column>
              <Column
                className="column"
                field="firstSurname"
                header="Primer apellido"
                style={{ width: "8%" }}
              ></Column>
              <Column
                className="column"
                field="secondSurname"
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
                field="startDate"
                header="Fecha de inicio"
                style={{ width: "8%" }}
              ></Column>
              <Column
                className="column"
                field="finalDate"
                header="Fecha final"
                style={{ width: "8%" }}
              ></Column>
              <Column
                className="column"
                field="entryTime"
                header="Horario de entrada"
                style={{ width: "10%" }}
              ></Column>
              <Column
                className="column"
                field="closingHour"
                header="Horario de salida"
                style={{ width: "10%" }}
              ></Column>
              <Column
                className="column"
                field="ci"
                header="Numero de carnet"
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
                field="password"
                header="Contraseña"
                style={{ width: "10%" }}
              ></Column>
              <Column
                className="column"
                field="userType"
                header="Rol"
                style={{ width: "10%" }}
              ></Column>
              <Column
                className="column"
                field="actions"
                header="Acciones"
                style={{ width: "10%" }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodosLosClientes
