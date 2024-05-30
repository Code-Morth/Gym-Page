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
}

const TodosLosProductosModal = ({
  visible,
  closeModal,
  customers,
}: ModalUpdateUser) => {
  const { url } = apisPeticion()
  const { show, toast } = useAlerts()
  const dataRed = useRef<any>(null)

  console.log("customers", customers)

  const handleUpdateUser = (event: any) => {
    event?.preventDefault()

    const userUpdateadd = Object.fromEntries(new FormData(event.target))

    console.log(`${url}/product/${customers?.id}`)
    console.log("userUpdateadd",userUpdateadd)

    axios
      .put(`${url}/product/${customers?.id}`, userUpdateadd, getConfig())
      .then((res) => {
        if (res.data.success) {
          show("Usuario actualizado Correctamente")
          dataRed.current.reset()
          closeModal()
        }
      })
      .catch((err) => console.log(err))
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
                <input
                  type="text"
                  required
                  name="name"
                />
              </div>

              <div className="content_box_inputs">
                <label htmlFor="price_sell">Precio</label>
                <input required type="text"  name="price_sell" />
              </div>

              <div className="content_box_inputs">
                <label htmlFor="stock">Stock</label>
                <input required type="text"  name="stock" />
              </div>
            </div>

            <button className="button-default">Actualizar</button>
          </form>
        </div>
        <Toast ref={toast} position="top-center" />
      </Modal>
    </div>
  )
}

export default TodosLosProductosModal
