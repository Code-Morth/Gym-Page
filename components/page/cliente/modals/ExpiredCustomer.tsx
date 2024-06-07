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
  setloader?: any
}

const ExpiredCustomer = ({
  visible,
  closeModal,
  customers,
  setupdateCounter,
  setloader,
}: Modalxd) => {
  const { url } = apisPeticion()

  const { show, toast } = useAlerts()
  const dataRed = useRef<any>(null)
  const [menbre, setmenbre] = useState<any>()
  const [membershipSelected, setmembershipSelected] = useState<any>()
  const [finalDate, setfinalDate] = useState<any>()

  useEffect(() => {
    axios
      .get(`${url}/membership?page=0&size=99999999`, getConfig())
      .then((res) => {
        setmenbre(res.data.data)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setupdateCounter((prev: any) => prev + 1)
      })
  }, [])

  const handleMembreshipChange = (event: any) => {
    const selectedId = event.target.value
    const selectedMembreship = menbre.filter(
      (data: any) => Number(data.id) === Number(selectedId)
    )

    axios
      .get(`${url}/membership/${selectedMembreship[0].id}`, getConfig())
      .then((res) => {
        setmembershipSelected(res.data.data), console.log("res", res.data.data)
      })
      .catch((err) => console.log(err))
  }

  const handleDate = (event: any) => {
    const date = new Date(event.target.value)

    date.setDate(date.getDate() + membershipSelected?.duration + 1)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0") // Los meses en JavaScript son base 0
    const day = String(date.getDate()).padStart(2, "0")

    setfinalDate(`${month}/${day}/${year}`)
  }

  const handleUpdateUser = (event: any) => {
    event?.preventDefault()
    setloader(true)
    // const userUpdateadd = Object.fromEntries(new FormData(event.target))

    const userUpdateadd = Object.fromEntries(
      Array.from(new FormData(event.target)).filter(
        ([key, value]) => value !== ""
      )
    )

    delete userUpdateadd.price
    delete userUpdateadd.initial_date
    delete userUpdateadd.final_date
    delete userUpdateadd.number_entries
    delete userUpdateadd.permissions

    console.log("userUpdateadd", userUpdateadd)

    axios
      .put(`${url}/client/${customers?.id}`, userUpdateadd, getConfig())
      .then((res) => {
        show("Usuario actualizado Correctamente")
        dataRed.current.reset()
        closeModal()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setupdateCounter((prev: any) => prev + 1)
        setloader(false)
      })
  }

  const deletedUser = () => {
    axios
      .delete(`${url}/client/${customers?.id}`, getConfig())
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

  return (
    <div>
      <Modal
        visible={visible}
        closeModal={closeModal}
        widthModal="w-[90%]  phone:w-[45rem] py-[3rem] h-[50rem] !bg-[black] "
        className="p-[3rem] main-page "
      >
        <div className="box_modal_info">
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
                <label htmlFor="email">Correo</label>
                <input name="email" type="email" />
              </div>
              <div className="content_box_inputs">
                <label htmlFor="ci">Ci</label>
                <input name="ci" type="number" />
              </div>
              <div className="content_box_inputs">
                <label htmlFor="">Cambiar membresia</label>
                <select
                  required
                  onChange={handleMembreshipChange}
                  name="fk_membership"
                >
                  <option disabled value="">
                    Elegir
                  </option>
                  {menbre?.map((op: any, index: number) => (
                    <option key={index} value={op?.id}>
                      {op?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="content_box_inputs">
                <label htmlFor="status">Cambiar estado</label>

                <select name="status">
                  <option>Elija</option>
                  <option selected value="active">
                    Activar
                  </option>
                  <option value="deleted">Desactivar</option>
                </select>
              </div>
              <div className="content_box_inputs">
                <label htmlFor="price">Precio</label>
                <input
                  readOnly
                  value={membershipSelected?.price ?? "0"}
                  name="price"
                  type="text"
                />
              </div>
              <div className="content_box_inputs">
                <label htmlFor="number_entries">Numero de entradas</label>
                <input
                  readOnly
                  value={membershipSelected?.duration ?? "0"}
                  name="number_entries"
                  type="text"
                />
              </div>
              <div className="content_box_inputs">
                <label htmlFor="initial_date">Desde</label>
                <input onChange={handleDate} name="initial_date" type="date" />
              </div>
              <div className="content_box_inputs">
                <label htmlFor="final_date">Hasta</label>
                <input
                  value={finalDate}
                  readOnly
                  name="final_date"
                  type="text"
                />
              </div>
              <div className="content_box_inputs">
                <label htmlFor="permissions">Permisos</label>
                <input
                  readOnly
                  value={membershipSelected?.permission ?? "0"}
                  name="permissions"
                  type="text"
                />
              </div>
            </div>
            <div className="button-container">
              <button className="button-default" type="submit">
                Actualizar
              </button>
              <button
                onClick={deletedUser}
                className="button-default"
                type="button"
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

export default ExpiredCustomer
