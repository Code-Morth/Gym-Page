import { Toast } from "primereact/toast"
import React, { useEffect, useRef, useState } from "react"
import Modal from "../../../globals/Modal"
import { useAlerts } from "../../../../hook/useAlerts"
import axios from "axios"
import apisPeticion from "@/api/apisPeticion"
import getConfig from "../../../../utils/getConfig"

interface Modalxd {
  visible: boolean
  closeModal: () => void
  customers?: any
  setupdateCounter?: any
}

const ExpiredCustomer = ({
  visible,
  closeModal,
  customers,
  setupdateCounter,
}: Modalxd) => {
  const { url } = apisPeticion()

  const { show, toast } = useAlerts()
  const dataRed = useRef<any>(null)
  const [menbre, setmenbre] = useState<any>()

  useEffect(() => {
    axios
      .get(`${url}/membership?page=0&size=20`, getConfig())
      .then((res) => {
        setmenbre(res.data.data)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setupdateCounter((prev: any) => prev + 1)
      })
  }, [])

  const handleUpdateUser = (event: any) => {
    event?.preventDefault()

    const userUpdateadd = Object.fromEntries(new FormData(event.target))

    userUpdateadd.status = "active"

    axios
      .put(`${url}/client/${customers?.id}`, userUpdateadd, getConfig())
      .then((res) => {
        if (res.data.success) {
          show("Usuario actualizado Correctamente")
          dataRed.current.reset()
          closeModal()
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setupdateCounter((prev: any) => prev + 1)
      })
  }

  return (
    <div>
      <Modal
        visible={visible}
        closeModal={closeModal}
        widthModal="w-[90%]  phone:w-[45rem] py-[3rem] h-[50rem] !bg-[black] "
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
                <label htmlFor="address">Dirrection</label>
                <input
                  type="text"
                  required
                  name="address"
                  placeholder="address"
                />
              </div>

              <div className="content_box_inputs">
                <label htmlFor="phone">Telefono</label>
                <input type="number" required name="phone" />
              </div>

              <div className="content_box_inputs">
                <label htmlFor="">Cambiar estado</label>
                <select name="status">
                  <option value="">Elegir</option>
                  {menbre?.map((op: any, index: number) => (
                    <option key={index} value={op?.name}>
                      {op?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="button-default" type="submit">
              Actulizar
            </button>
          </form>
        </div>
        <Toast ref={toast} position="top-center" />
      </Modal>
    </div>
  )
}

export default ExpiredCustomer
