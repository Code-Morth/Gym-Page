import apisPeticion from "@/api/apisPeticion"
import React, { useEffect, useState } from "react"
import getConfig from "../../../utils/getConfig"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import axios from "axios"
import useOpenModal from "../../../hook/useOpenModal"
import TodasLasMembresiasModal from "../usuarios/modals/TodasLasMembresiasModal"
import { useAlerts } from "../../../hook/useAlerts"

const TodasLasMembresias = () => {
  const [customers, setCustomers] = useState<any>([])
  const { url } = apisPeticion()
  const { Open, closeModal, openModal } = useOpenModal()
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const { show, toast } = useAlerts()

  const getData = () => {
    axios
      .get(`${url}/membership`, getConfig())
      .then((res) => {
        setCustomers(res.data.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {getData()}, [])

  const editData = (data: any) => {
    return (
      <button
        onClick={() => {
          openModal(), setSelectedUser(data)
        }}
      >
        Editar
      </button>
    )
  }

  const changeStatus = (data: any) => {
    const dataChange = data?.status === "active" ? "deleted" : "active"

    console.log("dataChange", dataChange)
    return (
      <button
        onClick={() => {getData(),
          axios
            .put(
              `${url}/membership/${data?.id}`,
              { status: dataChange },
              getConfig()
            )
            .then((res) => {
              if (res.data.success) {
                show("Usuario actualizado Correctamente")
              }
            })
            .catch((err) => console.log(err))
        }}
      >
        {data?.status}
      </button>
    )
  }

  return (
    <div className="box_all_producs main-page ">
      <h3>Todo las Membresias</h3>
      <div className="tabla-container">
        <DataTable
          className="data-table border"
          value={customers}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            className="column "
            field="name"
            header="Nombre"
            style={{ width: "8%" }}
          ></Column>
          <Column
            className="column"
            field="description"
            header="Description"
            style={{ width: "8%" }}
          ></Column>
          <Column
            className="column"
            field="price"
            header="Precio"
            style={{ width: "8%" }}
          ></Column>
          <Column
            className="column"
            field="permission"
            header="Permiso"
            style={{ width: "8%" }}
          ></Column>
          <Column
            className="column"
            field="duration"
            header="Duration"
            style={{ width: "8%" }}
          ></Column>
          <Column
            className="column"
            field="status"
            header="Estado"
            style={{ width: "8%" }}
            body={changeStatus}
          ></Column>
          <Column
            className="column"
            field="status"
            header="Acciones"
            style={{ width: "8%" }}
            body={editData}
          ></Column>
        </DataTable>
      </div>
      <TodasLasMembresiasModal
        customers={selectedUser}
        visible={Open}
        closeModal={closeModal}
      />
    </div>
  )
}

export default TodasLasMembresias
