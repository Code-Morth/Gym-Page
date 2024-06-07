"use client"
import { DataTable } from "primereact/datatable"
import getConfig from "@/../utils/getConfig"
import { Column } from "primereact/column"
import { useEffect, useState } from "react"
import apisPeticion from "@/api/apisPeticion"
import axios from "axios"
import useOpenModal from "../../../hook/useOpenModal"
import UpdateUserModal from "./modals/UpdateUserModal"
import AddUserModal from "./modals/AddUserModal"
import UpdatePassword from "./modals/UpdatePassword"
import Snipet from "../../loader/Snipet"

const TodosLosUsuarios = () => {
  const [customers, setCustomers] = useState<any>([])
  const { allUser, url } = apisPeticion()
  const { Open, closeModal, openModal } = useOpenModal()
  const [addUserModal, setaddUserModal] = useState<boolean>(false)
  const [modalPassword, setModalPassword] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [selectedUserAdd, setSelectedUserAdd] = useState<any>(null)
  const [selectedPassword, setSelectedPassword] = useState<any>(null)
  const [Ci, setci] = useState<any>("")
  const [CiT, setciT] = useState<any>("")
  const [updateCounter, setupdateCounter] = useState(0)
  const [loader, setloader] = useState(false)

  const closeModal2 = () => {
    setaddUserModal(false)
  }
  

  useEffect(() => {
    axios
      .get(`${allUser}`, getConfig())
      .then((res) => setCustomers(res.data.data))
      .catch((err) => console.log(err))
      closeModal()
  }, [updateCounter])

  const openUserModal = (user: any) => {
    setSelectedUser(user)
    openModal()
  }

  const openUserModalAdd = (user: any) => {
    setSelectedUserAdd(user)
    setaddUserModal(true)
  }
  const openUserModalPassword = (user: any) => {
    setSelectedPassword(user)
    setModalPassword(true)
  }

  const closeModalPassword = () => {
    setModalPassword(false)
  }

  const accionUser = (rowData: any) => {
    return <button onClick={() => openUserModal(rowData)}>Activo</button>
  }

  const accionPassword = (rowData: any) => {
    return (
      <button onClick={() => openUserModalPassword(rowData)}>
        {rowData?.password}
      </button>
    )
  }

  const accionUserAdd = (rowData: any) => {
    return <button onClick={() => openUserModalAdd(rowData)}>Inactivo</button>
  }

  useEffect(() => {
    axios
      .get(`${allUser}`, getConfig())
      .then((res) => setCustomers(res.data.data))
      .catch((err) => console.log(err))
  }, [])

  const searchById = (e: any) => {
    setci(e.target.value)
    setciT(e.target.value)
  }

  const filterUser = customers.filter((user: any) => {
    const dat = user?.ci.toLowerCase().includes(Ci.toLowerCase())
    const xd = user?.status == "active"
    return dat && xd
  })

  const filterUserCi = customers.filter((user: any) => {
    const dat = user?.ci.toLowerCase().includes(CiT.toLowerCase())
    const xdd = user?.status !== "active"  
    return dat && xdd
  })


  const admminOrUser = (data: any) => {
    const adOrUs = data.fk_typeuser === 1 ? "Admin" : "User"

    return <span>{adOrUs}</span>
  }

  return (
    <>
      <div className="TodosLosUsuarios main-page">
        {!loader && (
          <div className="todos-los-usarios-container">
            <input
              onChange={searchById}
              className="search-client"
              type="text"
              placeholder="Buscar Usuario"
            />

            <div className="table-1 ">
              <h1>Usuarios activos</h1>
              <div className="tabla-container">
                <DataTable
                  className="data-table"
                  value={filterUser}
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
                    body={accionPassword}
                  ></Column>
                  <Column
                    className="column"
                    field="fk_typeuser"
                    header="Rol"
                    style={{ width: "10%" }}
                    body={admminOrUser}
                  ></Column>
                  <Column
                    className="column"
                    field="status"
                    header="Acciones"
                    style={{ width: "10%" }}
                    body={accionUser}
                  ></Column>
                </DataTable>
              </div>
              <UpdateUserModal
                customers={selectedUser}
                visible={Open}
                closeModal={closeModal}
                setupdateCounter={setupdateCounter}
                setloader={setloader}
              />
              <UpdatePassword
                customers={selectedPassword}
                visible={modalPassword}
                closeModal={closeModalPassword}
                setupdateCounter={setupdateCounter}
              />
            </div>
            <div className="table-2">
              <h1>Usuarios inactivos</h1>

              <div className="tabla-container">
                <DataTable
                  className="data-table"
                  value={filterUserCi}
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
                    body={admminOrUser}
                  ></Column>
                  <Column
                    className="column"
                    field="status"
                    header="Acciones"
                    body={accionUserAdd}
                    style={{ width: "10%" }}
                  ></Column>
                </DataTable>
                <AddUserModal
                  customers={selectedUserAdd}
                  visible={addUserModal}
                  closeModal={closeModal2}
                  setupdateCounter={setupdateCounter}
                  setloader={setloader}
                />
              </div>
            </div>
          </div>
        )}
        {loader && <Snipet />}
      </div>
    </>
  )
}

export default TodosLosUsuarios
