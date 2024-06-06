"use client"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { act, useEffect, useRef, useState } from "react"
import apisPeticion from "@/api/apisPeticion"
import getConfig from "../../../utils/getConfig"
import axios from "axios"

import useOpenModal from "../../../hook/useOpenModal"
import ExpiredCustomer from "./modals/ExpiredCustomer"
import Snipet from "../../loader/Snipet"
import Permissions from "./modals/Permissions"
import QuotesModal from "./modals/QuotesModal"

const TodosLosClientes = () => {
  const { Open, openModal, closeModal } = useOpenModal()
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [customers, setCustomers] = useState<any>([])
  const [memberShip, setmemberShip] = useState<any>()
  const [inputData, setinputData] = useState("")
  const { url } = apisPeticion()
  const [updateCounter, setupdateCounter] = useState(0)
  const [loader, setloader] = useState(false)
  const [visible2, setvisible2] = useState(false)
  const [visible3, setvisible3] = useState(false)
  const [value, setValue] = useState(0)
  const [cuotesData, setcuotesData] = useState<any>()

  const closeModal2 = () => {
    setvisible2(false)
    setValue(0)
  }

  const closeModal3 = () => {
    setvisible3(false)
    setValue(0)
  }

  useEffect(() => {
    axios
      .get(`${url}/client?page=0&size=99999999`, getConfig())
      .then((res) => setCustomers(res.data.data))
      .catch((err) => console.log(err))

    axios
      .get(`${url}/membership`, getConfig())
      .then((res) => setmemberShip(res.data.data))
      .catch((err) => console.log(err))
  }, [updateCounter, url])

  const filterCustomerExpired =
    customers && customers.length > 0
      ? customers?.filter((user: any) => {
          const statusUser = user?.status !== "active"
          return statusUser
        })
      : [customers]?.filter((user: any) => {
          const statusUser = user?.status !== "active"
          return statusUser
        })

  const filterCustomerActive =
    customers && customers.length > 0
      ? customers
          ?.filter((user: any) => {
            const statusUser = user?.status === "active"
            return statusUser
          })
          .filter((custon: any) => {
            const namesss = custon?.ci.includes(inputData)
            return namesss
          })
      : [customers]
          ?.filter((user: any) => {
            const statusUser = user?.status === "active"
            return statusUser
          })
          .filter((custon: any) => {
            const namesss = custon?.ci.includes(inputData)
            return namesss
          })

  const putStatusDeleted = (rowData: any) => {
    if (
      rowData.quantity === rowData.duration + 1 ||
      rowData.duration - rowData.quantity <= 0
    ) {
      axios
        .put(`${url}/client/${rowData.id}`, { status: "deleted" }, getConfig())
        .then((res) => {
          setCustomers(res.data.data)
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setloader(false), setupdateCounter((prev: any) => prev + 1)
        })
    }

    const putData = () => {
      setloader(true)
      axios
        .put(`${url}/client/${rowData.id}`, { status: "deleted" }, getConfig())
        .then((res) => {
          setCustomers(res.data.data)
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setloader(false), setupdateCounter((prev: any) => prev + 1)
        })
    }

    return <button onClick={putData}>Desactivar</button>
  }

  const openUserModal = (user: any) => {
    setSelectedUser(user)
    openModal()
  }

  const openUserModalPermission = (user: any) => {
    setSelectedUser(user)
    setvisible2(true)
  }

  const openQuotesModal = (user: any) => {
    setSelectedUser(user)
    setvisible3(true)
  }

  const putStatusActive = (data: any) => {
    return <button onClick={() => openUserModal(data)}>Activar</button>
  }

  const permissionButton = (data: any) => {
    const dataPermission = memberShip?.filter(
      (e: any) => e.id === data?.fk_membership
    )

    const dataPermisionFinal = dataPermission
      ? dataPermission[0]?.permission
      : "No data"

    return (
      <button onClick={() => openUserModalPermission(data)}>
        {dataPermisionFinal ?? "No hay valor"}
      </button>
    )
  }

  const columnMemberShip = (rowData: any) => {
    const filterMemberShip = memberShip?.filter((data: any) => {
      const member = data.id === rowData.fk_membership
      return member
    })

    return (
      <span>
        {filterMemberShip && filterMemberShip.length > 0
          ? filterMemberShip[0].name
          : "Membresia"}
      </span>
    )
  }

  const searchById = (data: any) => {
    setinputData(data.target.value)
  }

  const ticketsAvailable = (data: any) => {
    const ticketA = data.duration - data.quantity ?? "No disponible"

    return <span>{ticketA}</span>
  }

  const finalDayRegistration = (data: any) => {
    const ticketA = data.duration - data.quantity ?? "0"

    const actualDate = new Date()

    actualDate.setDate(actualDate.getDate() + ticketA)

    const year = actualDate.getFullYear()
    const month = String(actualDate.getMonth() + 1).padStart(2, "0") // Los meses en JavaScript son base 0
    const day = String(actualDate.getDate()).padStart(2, "0")

    return <span>{`${month}/${day}/${year}`}</span>
  }

  const quotes = (data: any) => {
    const quotesArray = data?.quotes?.map((e: any) => e.total)


    return (
      <button style={{minWidth:"3rem",minHeight:"3rem",width:"100%",height:"100%"}} onClick={() =>openQuotesModal(data)}>
        {quotesArray?.map((a: any, index: number) => (
          <span key={index}>{a} </span>
        ))}
      </button>
    )
  }

  return (
    <div className="TodosLosClientes">
      {!loader && (
        <div className="todos-los-clientes-container">
          <input
            onChange={searchById}
            type="text"
            placeholder="Buscar cliente"
          />
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
                  field="ci"
                  header="CI"
                  style={{ width: "8%" }}
                ></Column>
                <Column
                  className="column"
                  field="first_name"
                  header="Nombre completo"
                  style={{ width: "5%" }}
                ></Column>
                <Column
                  className="column"
                  field="last_name1"
                  header="Primer apellido"
                  style={{ width: "5%" }}
                ></Column>
                <Column
                  className="column"
                  field="last_name2"
                  header="Segundo apellido"
                  style={{ width: "5%" }}
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
                  style={{ width: "5%" }}
                  body={columnMemberShip}
                ></Column>
                <Column
                  className="column"
                  field="phone"
                  header="Telefono"
                  style={{ width: "5%" }}
                ></Column>
                <Column
                  className="column"
                  field="address"
                  header="Direccion"
                  style={{ width: "7%" }}
                ></Column>
                <Column
                  className="column"
                  field="createdAt"
                  header="Fecha de registro"
                  style={{ width: "10%" }}
                ></Column>
                <Column
                  className="column"
                  header="Permisos usados"
                  field="permission"
                  style={{ width: "3%" }}
                ></Column>
                <Column
                  className="column"
                  header="Permisos"
                  style={{ width: "3%" }}
                  body={permissionButton}
                ></Column>
                <Column
                  className="column"
                  field="duration"
                  header="Entradas disponibles"
                  style={{ width: "3%" }}
                  body={ticketsAvailable}
                ></Column>
                <Column
                  className="column"
                  header="Fecha final de inscripcion"
                  style={{ width: "6%" }}
                  body={finalDayRegistration}
                ></Column>
                <Column
                  className="column"
                  header="Cuotas"
                  style={{ width: "5%" }}
                  body={quotes}
                ></Column>
                <Column
                  className="column"
                  field="status"
                  header="Estado de membresia"
                  style={{ width: "5%" }}
                ></Column>
                <Column
                  className="column"
                  field="id"
                  header="Acciones"
                  style={{ width: "2%" }}
                  body={putStatusDeleted}
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
                  field="ci"
                  header="CI"
                  style={{ width: "8%" }}
                ></Column>
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
                  body={putStatusActive}
                ></Column>
              </DataTable>
            </div>
          </div>
        </div>
      )}
      {loader && <Snipet />}
      <ExpiredCustomer
        setupdateCounter={setupdateCounter}
        customers={selectedUser}
        visible={Open}
        closeModal={closeModal}
        setloader={setloader}
      />
      <Permissions
        visible={visible2}
        closeModal={closeModal2}
        setupdateCounter={setupdateCounter}
        customers={selectedUser}
        setValue={setValue}
        value={value}
        setloader={setloader}
      />
      <QuotesModal
        setupdateCounter={setupdateCounter}
        customers={selectedUser}
        visible={visible3}
        closeModal={closeModal3}
        setloader={setloader}
      />
    </div>
  )
}

export default TodosLosClientes
