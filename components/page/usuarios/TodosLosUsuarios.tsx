"use client"
import { DataTable } from "primereact/datatable"
import getConfig from "@/../utils/getConfig";
import { Column } from "primereact/column"
import { useEffect, useState } from "react"
import apisPeticion from "@/api/apisPeticion"
import axios from "axios"
import useOpenModal from "../../../hook/useOpenModal";
import UpdateUserModal from "./modals/UpdateUserModal";
import AddUserModal from "./modals/AddUserModal";

const TodosLosUsuarios = () => {
  const [customers, setCustomers] = useState<any>([]);
  const { allUser } = apisPeticion();
  const {Open ,closeModal ,openModal} = useOpenModal();
  const [addUserModal, setaddUserModal] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const closeModal2 = () => {
    setaddUserModal(false)
  }
 
        const filterCustomer = customers.filter((user:any)=>{
          const statusUser= user?.status !== "active";
          return statusUser;
        })

        const filterCustomeractive = customers.filter((user:any)=>{
          const statusUser= user?.status === "active";
          return statusUser;
        })

        const openUserModal = (user: any) => {
          setSelectedUser(user);
          openModal();
        }

        const openUserModalAdd = (user: any) => {
          setSelectedUser(user);
          setaddUserModal(true);
        }

        const accionUser = (rowData: any) => {
          return <button onClick={()=>openUserModal(rowData)}>{rowData?.status}</button>
        }
        const accionUserAdd = (rowData: any) => {
          return <button onClick={()=>openUserModalAdd(rowData)}>{rowData?.status}</button>
        }

        useEffect(() => {
          axios.get(`${allUser}`,getConfig()).then(res => setCustomers(res.data.data)).catch(err => console.log(err))
        }, [ ])


        useEffect(() => {
         
        }, [filterCustomeractive , filterCustomer])
        
  return (
    <>
      <div className="TodosLosUsuarios">
        <div className="todos-los-usarios-container">
        <input className='search-client' type="text" placeholder='Buscar Usuario' />

          <div className="table-1 ">
            <h1>Usuarios activos</h1>
            <div className="tabla-container">
              <DataTable
                className="data-table"
                value={filterCustomeractive}
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
                  body={accionUser}
                ></Column>
              </DataTable>
            </div>
            <UpdateUserModal customers={selectedUser} visible={Open} closeModal={closeModal}/>
          </div>
          <div className="table-2">
            <h1>Usuarios inactivos</h1>
            <div className="tabla-container">
              <DataTable
                className="data-table"
                value={filterCustomer}
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
                  body={accionUserAdd}
                  style={{ width: "10%" }}
                ></Column>
              </DataTable>
              <AddUserModal customers={selectedUser} visible={addUserModal} closeModal={closeModal2}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodosLosUsuarios
