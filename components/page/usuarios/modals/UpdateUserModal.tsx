import React, { useRef } from "react"
import Modal from "../../../globals/Modal"
import axios from "axios"
import apisPeticion from "@/api/apisPeticion"
import getConfig from "../../../../utils/getConfig"
import { useAlerts } from "../../../../hook/useAlerts"
import { Toast } from "primereact/toast"
interface ModalUpdateUser {
  visible: boolean
  closeModal: () => void
  setlogin?: React.Dispatch<React.SetStateAction<boolean>>
  customers?: any
  setupdateCounter?: any
  setloader?: any
}

const UpdateUserModal = ({
  visible,
  closeModal,
  customers,
  setupdateCounter,
  setloader,
}: ModalUpdateUser) => {
  const { url } = apisPeticion()
  const { show, toast } = useAlerts()
  const dataRed = useRef<any>(null)

  const handleUpdateUser = (event: any) => {
    event?.preventDefault()
    setloader(true)

    const userUpdate = Object.fromEntries(
      Array.from(new FormData(event.target)).filter(
        ([key, value]) => value !== ""
      )
    )

    if (userUpdate.status === "delete") {
      axios
        .delete(`${url}/user/${customers?.id}`, getConfig())
        .then((res) => {
          if (res.data.success) {
            dataRed.current.reset()
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setupdateCounter((prev: any) => prev + 1),
            setloader(false),
            closeModal(),
            show("Usuario eliminado Correctamente")
          })
    }

    if (userUpdate.status === "deactivate") {
      axios
        .put(
          `${url}/user/${customers?.id}`,
          {
            status: "deleted",
          },
          getConfig()
        )
        .then((res) => {
          if (res.data.success) {
            dataRed.current.reset()
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setupdateCounter((prev: any) => prev + 1),
            setloader(false),
            closeModal(),
            show("Usuario actualizado Correctamente")
        })
    }
  }

  return (
    <div>
      <Modal
        visible={visible}
        closeModal={closeModal}
        widthModal="w-[90%]  phone:w-[45rem] py-[3rem] h-[50rem] !bg-[black] "
        className="p-[3rem] main-page "
      >
        <div className="box_modal_info main-page">
          <h2>Actulizar Usuario</h2>

          <form
            className="box_modal_formu"
            ref={dataRed}
            onSubmit={handleUpdateUser}
          >
            <label htmlFor="status">Cambiar estado</label>

            <select name="status">
              <option>Elija</option>
              <option value={"deactivate"}>Desactivar</option>
              <option value={"delete"}>Eliminar</option>
            </select>
            <button className="button-default" type="submit">
              Actualizar
            </button>
          </form>
        </div>
        <Toast ref={toast} position="top-center" />
      </Modal>
    </div>
  )
}

export default UpdateUserModal
