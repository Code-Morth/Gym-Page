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

const UpdateUserModal = ({
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
    console.log("esta lad ata",userUpdate);
    axios.put(`${url}/user/${customers?.id}`, userUpdate, getConfig())
      .then((res) => {
        
        if (res.data.success) {
          show("Usuario actualizado Correctamente");
          dataRed.current.reset();
          closeModal();
        }
      })
      .catch((err) => console.log(err));
  };

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
            <label htmlFor="">Cambiar estado</label>

            <select name="status">
              <option >Elija</option>
              <option value={"deleted"}>Eliminar</option>
            </select>
            <button className="button-default" type="submit">
              Actualizar
            </button>
          </form>
        </div>
        <Toast ref={toast} position="top-center" />
      </Modal>
    </div>
  );
};

export default UpdateUserModal;
