import { Toast } from "primereact/toast"
import React, { useEffect, useRef, useState } from "react"
import Modal from "../../../globals/Modal"
import { useAlerts } from "../../../../hook/useAlerts"
import axios from "axios"
import apisPeticion from "@/api/apisPeticion"
import getConfig from "../../../../utils/getConfig"

interface Modalxd {
  visible: boolean
  closeModal: any
  customers?: any
  setupdateCounter?: any
  setloader?: any
}

const QuotesModal = ({
  visible,
  closeModal,
  customers,
  setupdateCounter,
  setloader,
}: Modalxd) => {
  const { url } = apisPeticion()

  const { show, toast } = useAlerts()
  const dataRed = useRef<any>(null)
  const [maxInput, setmaxInput] = useState(0)
  const dataRef = useRef<any>(null)
  const [inputValue, setinputValue] = useState(0)

  const quotesData = customers?.quotes?.map((data: any) => data?.total)

  useEffect(() => {
    axios
      .get(`${url}/membership/${customers?.fk_membership}`, getConfig())
      .then((res) => {

        let priceMembershipMoment = Number(res.data.data.price)

        quotesData.forEach((e: any) => {
          priceMembershipMoment -= Number(e)
        })

        setmaxInput(priceMembershipMoment < 0 ? 0 : priceMembershipMoment)
      })
      .catch((err) => console.log(err))
      .finally(() => setupdateCounter((prev: any) => prev + 1))

      setinputValue(0)
      
  }, [visible])

  const handleUpdateUser = (event: any) => {
    event.preventDefault()

    const dataForm = Object.fromEntries(new FormData(event.target))

    axios
      .post(
        `${url}/clientquote`,
        { fk_client: customers?.id, total: dataForm.quote },
        getConfig()
      )
      .then((res) => {
        if (res.data.success) {
          dataRef.current.reset()
        }
      })
      .catch((err) => console.log(err))
  }

  const inputChange = (data: any) => {
    if (data.target.value >= maxInput) setinputValue(maxInput)
    if (data.target.value <= 0) setinputValue(0)
    if (data.target.value > 0 && data.target.value < maxInput) setinputValue(data.target.value)
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
          <h2>Agregar pago</h2>
          <p>Falta por pagar {maxInput} bolivianos</p>

          <form
            className="box_modal_formu"
            ref={dataRed}
            onSubmit={handleUpdateUser}
          >
            <div className="">
              <div className="content_box_inputs">
                <label htmlFor="quote">Ingrese cuota</label>
                <input
                  min={0}
                  max={maxInput}
                  value={inputValue}
                  onChange={inputChange}
                  name="quote"
                  type="number"
                />
              </div>
            </div>
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

export default QuotesModal
