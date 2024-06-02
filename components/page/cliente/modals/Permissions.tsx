"use client"
import React, { useEffect, useRef, useState } from "react"
import apisPeticion from "@/api/apisPeticion"
import { Toast } from "primereact/toast"
import axios from "axios"
import getConfig from "../../../../utils/getConfig"
import { useAlerts } from "../../../../hook/useAlerts"
import Modal from "../../../globals/Modal"

interface Modalxd {
  visible: boolean
  closeModal: any
  customers?: any
  setupdateCounter?: any
  setValue?: any
  value?: any
  setloader?:any
}

const Permissions = ({
  visible,
  closeModal,
  customers,
  setupdateCounter,
  setValue,
  value,
  setloader
}: Modalxd) => {
  const { url } = apisPeticion()
  const { show, toast } = useAlerts()

  const maxPermission = customers?.permission

  const handleChange = (e: any) => {
    let newValue = parseInt(e.target.value, 10)

    if (newValue >= Number(customers?.quantity)) {
      newValue = Number(customers?.quantity)
    }

    if (newValue > maxPermission) {
      newValue = maxPermission
    }

    setValue(newValue)
  }

  const changePermission = () => {
    setloader(true)
    axios
      .put(
        `${url}/client/${customers?.id}`,
        {
          permission: customers?.permission - value,
          quantity: customers?.quantity - value,
        },
        getConfig()
      )
      .then((res) => {
        if (res.data.success) {
          closeModal()
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setupdateCounter((prev: any) => prev + 1),
          show("Usuario actualizado Correctamente"),setloader(false)
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
          <h2>Digite la cantidad de permisos</h2>
          <input
            min={0}
            max={maxPermission}
            value={value}
            onChange={handleChange}
            type="number"
          />

          <button className="button-default" onClick={changePermission}>
            Actualizar
          </button>
        </div>
        <Toast ref={toast} position="top-center" />
      </Modal>
    </div>
  )
}

export default Permissions
