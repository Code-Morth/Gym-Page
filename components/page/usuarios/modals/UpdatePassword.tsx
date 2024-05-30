import React, { useRef } from 'react'
import Modal from '../../../globals/Modal'
import apisPeticion from '@/api/apisPeticion'
import { useAlerts } from '../../../../hook/useAlerts'
import axios from 'axios'
import getConfig from '../../../../utils/getConfig'
import { Toast } from 'primereact/toast'

const UpdatePassword = ({
    visible,
    closeModal,
    customers,
  }: any) => {


    console.log(customers)
    const { url } = apisPeticion()
  const { show, toast } = useAlerts()
  const dataRed = useRef<any>(null)

  const handleUpdateUser = (event: any) => {
    event?.preventDefault()

    const userUpdateaPassword= Object.fromEntries(new FormData(event.target))

console.log(userUpdateaPassword)
    axios
      .put(`${url}/user/${customers?.id}`, userUpdateaPassword, getConfig())
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
       

        <form
          className="box_modal_formu"
          ref={dataRed}
          onSubmit={handleUpdateUser}
        >
          <div className="content_box_inputs">
           <h2>Actualizar Contraseña</h2>
           <h3 className='text-center'>{customers?.email}</h3>
           <div className='content_box_inputs'>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='*******' name='password' id='password' />
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

export default UpdatePassword
