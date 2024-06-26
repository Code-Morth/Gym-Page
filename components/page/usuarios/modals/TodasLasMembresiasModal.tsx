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
  setupdateCounter?:any
}

const TodasLasMembresiasModal = ({
  visible,
  closeModal,
  customers,
  setupdateCounter
}: ModalUpdateUser) => {
  const { url } = apisPeticion()
  const { show, toast } = useAlerts()
  const dataRed = useRef<any>(null)

  console.log("customers", customers)

  const handleUpdateUser = (event: any) => {
    event?.preventDefault()

    const userUpdateadd = Object.fromEntries(new FormData(event.target))

    console.log(`${url}/membership/${customers?.id}`)
    console.log("userUpdateadd", userUpdateadd)

    axios
      .put(`${url}/membership/${customers?.id}`, userUpdateadd, getConfig())
      .then((res) => {
        if (res.data.success) {
          show("Usuario actualizado Correctamente")
          dataRed.current.reset()
          closeModal()
        }
      })
      .catch((err) => console.log(err)).finally(()=>setupdateCounter((prev:any)=>prev+1))
  }

  const deleteUser = () => {
    axios
      .put(
        `${url}/membership/${customers?.id}`,
        { status: "deleted" },
        getConfig()
      )
      .then((res) => {
        if (res.data.success) {
          show("Usuario actualizado Correctamente")
          dataRed.current.reset()
          closeModal()
        }
      })
      .catch((err) => console.log(err)).finally(()=>setupdateCounter((prev:any)=>prev+1))
  }

  return (
    <div>
      <Modal
        visible={visible}
        closeModal={closeModal}
        widthModal="w-[90%] phone:w-[45rem] py-[3rem] h-[50rem] !bg-[black] "
        className="p-[3rem] main-page "
      >
        <div className="box_modal_info">
          <h2>Actulizar Usuario</h2>

          <form
            className="box_modal_formu"
            ref={dataRed}
            onSubmit={handleUpdateUser}
          >
            <div className="contex_box_all_inputs">
              <div className="content_box_inputs">
                <label htmlFor="name">Nombre</label>
                <input type="text" required name="name" />
              </div>
              <div className="content_box_inputs">
                <label htmlFor="description">Descripcion</label>
                <input required type="text" name="description" />
              </div>
              <div className="content_box_inputs">
                <label htmlFor="price">Precio</label>
                <input required type="text" name="price" />
              </div>
              <div className="content_box_inputs">
                <label htmlFor="duration">Duracion</label>
                <input required type="text" name="duration" />
              </div>
            </div>
            <div className="button-container">
              <button className="button-default">Actualizar</button>
              <button
                onClick={deleteUser}
                type="button"
                className="button-default"
              >
                Eliminar
              </button>
            </div>
          </form>
        </div>
        <Toast ref={toast} position="top-center" />
      </Modal>
    </div>
  )
}

export default TodasLasMembresiasModal
