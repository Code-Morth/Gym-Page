import React, { useRef } from "react";
import Modal from "../../../globals/Modal";
import axios from "axios";
import apisPeticion from "@/api/apisPeticion";
import getConfig from "../../../../utils/getConfig";
import { useAlerts } from "../../../../hook/useAlerts";
import { Toast } from "primereact/toast";
interface ModalUpdateUser {
  visible: boolean;
  closeModal: () => void;
  setlogin?: React.Dispatch<React.SetStateAction<boolean>>;
  customers?: any;
}

const AddUserModal = ({
  visible,
  closeModal,
  customers,
}: ModalUpdateUser) => {
  const { url } = apisPeticion();
  const { show, toast } = useAlerts();
  const dataRed = useRef<any>(null);

  const handleUpdateUser = (event: any) => {
    event?.preventDefault();

    const userUpdate = Object.fromEntries(new FormData(event.target));

    axios
      .put(`${url}/user/${customers?.id}`, userUpdate, getConfig())
      .then((res) => {
        if (res.data.success) {
          show("Usuario actualizado Correctamente");
          dataRed.current.reset();

          closeModal();
        }
      })
      .catch((err) => console.log(err));
  };

  console.log(customers)
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
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" required name="email" placeholder="maria@gmail.com" />
              <label htmlFor="email">Fecha de inicio</label>
              <input type="email" required name="email" placeholder="maria@gmail.com" />
            </div>
            
           <div>
           <label htmlFor="">Cambiar estado</label>
            <select name="status">
              <option>Agregar</option>
            </select>
           </div>
            <button className="button-default" type="submit">
              Actulizar
            </button>
          </form>
        </div>
        <Toast ref={toast} position="top-center" />
      </Modal>
    </div>
  );
};

export default AddUserModal;