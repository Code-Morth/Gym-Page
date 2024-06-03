import React, { useRef } from "react"
import Modal from "../../../globals/Modal"
import axios from "axios"
import apisPeticion from "@/api/apisPeticion"
import getConfig from "../../../../utils/getConfig"
import { useAlerts } from "../../../../hook/useAlerts"
import { Toast } from "primereact/toast"
interface ModalUpdateUser {
  visible: any
  closeModal: any
  setlogin?: any
  customers?: any
  setupdateCounter?: any
  setloader?: any
}

const AddUserModal = ({
  visible,
  closeModal,
  customers,
  setupdateCounter,
  setloader,
}: ModalUpdateUser) => {
  const { url } = apisPeticion()
  const { show, toast } = useAlerts()
  const dataRed = useRef<any>(null)

  console.log("customers", customers)

  const handleUpdateUser = (event: any) => {
    event?.preventDefault()
    setloader(true)

    const userUpdateadd = Object.fromEntries(
      Array.from(new FormData(event.target)).filter(
        ([key, value]) => value !== ""
      )
    )

    console.log("userUpdateadd", userUpdateadd)

    axios
      .put(`${url}/user/${customers?.id}`, userUpdateadd, getConfig())
      .then((res) => {
        if (res.data.success) {
          show("Usuario actualizado Correctamente")
          dataRed.current.reset()
          closeModal()
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {setloader(false),closeModal()})

    setupdateCounter((prev: any) => prev + 1)
  }

  const deleteUser = () => {
    setloader(true)

    axios
      .put(
        `${url}/user/${customers?.id}`,
        {
          status: "pending",
        },
        getConfig()
      )
      .then((res) => {
        if (res.data.success) {
          show("Usuario actualizado Correctamente")
          dataRed.current.reset()
          closeModal()
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {setloader(false),closeModal()})

    setupdateCounter((prev: any) => prev + 1)
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
          <h2>Actualizar Usuario</h2>

          <form
            className="box_modal_formu"
            ref={dataRed}
            onSubmit={handleUpdateUser}
          >
            <div className="contex_box_all_inputs">
              <div className="content_box_inputs">
                <label htmlFor="first_name">Nombre de usuario</label>
                <input name="first_name" type="text" />
              </div>
              <div className="content_box_inputs">
                <label htmlFor="last_name1">Primer apellido</label>
                <input name="last_name1" type="text" />
              </div>
              <div className="content_box_inputs">
                <label htmlFor="last_name2">Segundo apellido</label>
                <input name="last_name2" type="text" />
              </div>
              <div className="content_box_inputs">
                <label htmlFor="address">Direccion</label>
                <input type="text" name="address" placeholder="address" />
              </div>
              <div className="content_box_inputs">
                <label htmlFor="phone">Telefono</label>
                <input type="number" name="phone" />
              </div>
              <div className="content_box_inputs">
                <label htmlFor="ci">Ci</label>
                <input name="ci" type="number" />
              </div>
              <div className="content_box_inputs">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="maria@gmail.com"
                />
              </div>

              <div className="content_box_inputs">
                <label htmlFor="initial_date">Fecha de inicio</label>
                <input type="date" name="initial_date" />
              </div>

              <div className="content_box_inputs">
                <label htmlFor="final_date">Fecha de Final</label>
                <input type="date" name="final_date" />
              </div>

              <div className="content_box_inputs">
                <label htmlFor="initial_time">Hora de Entrada</label>
                <input type="time" name="initial_time" />
              </div>

              <div className="content_box_inputs">
                <label htmlFor="final_time">Hora de Salida</label>
                <input type="time" name="final_time" />
              </div>

              <div className="content_box_inputs">
                <label htmlFor="address">Dirrecion</label>
                <input
                  type="text"
                  name="address"
                  placeholder="bolivia la paz"
                />
              </div>

              <div className="content_box_inputs">
                <label htmlFor="fk_typeuser">Rol</label>
                <select name="fk_typeuser">
                  <option value="">Elegir el Rol</option>
                  <option value="1">Adminitrador</option>
                  <option value="2">Trabajador</option>
                </select>
              </div>

              <div className="content_box_inputs">
                <label htmlFor="">Cambiar estado</label>
                <select name="status">
                  <option value="">Elegir</option>
                  <option value={"active"}>active</option>
                </select>
              </div>
            </div>

            <div className="button-container">
              <button className="button-default" type="submit">
                Actualizar
              </button>
              <button
                className="button-default"
                type="button"
                onClick={deleteUser}
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

export default AddUserModal
