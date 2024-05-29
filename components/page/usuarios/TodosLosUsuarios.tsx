"use client"
import { DataTable } from "primereact/datatable"
import getConfig from "@/../utils/getConfig";
import { Column } from "primereact/column"
import { useEffect, useState } from "react"
import todosLosUsuarios from "../../../json/todosLosUsuarios.json"
import apisPeticion from "@/api/apisPeticion"
import axios from "axios"

const TodosLosUsuarios = () => {
  const [customers, setCustomers] = useState<any>([]);
  const { allUser } = apisPeticion();

  useEffect(() => {
    axios.get(`${allUser}`,getConfig()).then(res => setCustomers(res.data.data)).catch(err => console.log(err))
  }, [])
console.log(customers)
  return (
    <>
      <div className="TodosLosUsuarios">
        <div className="todos-los-usarios-container">
        <input className='search-client' type="text" placeholder='Buscar cliente' />

          <div className="table-1">
            <h1>Usuarios activos</h1>
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
                  field="username"
                  header="Nombre completo"
                  style={{ width: "8%" }}
                ></Column>
                <Column
                  className="column"
                  field="first_name"
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
                  field="initial_date"
                  header="Fecha de inicio"
                  style={{ width: "8%" }}
                ></Column>
                <Column
                  className="column"
                  field="final_date"
                  header="Fecha final"
                  style={{ width: "8%" }}
                ></Column>
                <Column
                  className="column"
                  field="initial_time"
                  header="Horario de entrada"
                  style={{ width: "10%" }}
                ></Column>
                <Column
                  className="column"
                  field="final_time"
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
                  field="fk_typeuser"
                  header="Rol"
                  style={{ width: "10%" }}
                ></Column>
                <Column
                  className="column"
                  field="status"
                  header="Acciones"
                  style={{ width: "10%" }}
                ></Column>
              </DataTable>
            </div>
          </div>
          <div className="table-2">
            <h1>Usuarios inactivos</h1>
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
                  field="username"
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
                  field="initial_date"
                  header="Fecha de inicio"
                  style={{ width: "8%" }}
                ></Column>
                <Column
                  className="column"
                  field="final_date"
                  header="Fecha final"
                  style={{ width: "8%" }}
                ></Column>
                <Column
                  className="column"
                  field="initial_time"
                  header="Horario de entrada"
                  style={{ width: "10%" }}
                ></Column>
                <Column
                  className="column"
                  field="final_time"
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
                  field="fk_typeuser"
                  header="Rol"
                  style={{ width: "10%" }}
                ></Column>
                <Column
                  className="column"
                  field="status"
                  header="Acciones"
                  style={{ width: "10%" }}
                ></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodosLosUsuarios
