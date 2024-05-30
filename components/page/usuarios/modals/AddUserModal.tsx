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

  console.log("customers",customers)

  const handleUpdateUser = (event: any) => {
    event?.preventDefault();

    const userUpdateadd = Object.fromEntries(new FormData(event.target));

    axios
      .put(`${url}/user/${customers?.id}`, userUpdateadd, getConfig())
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
        <div className="box_modal_info main-page">
          <h2>Actulizar Usuario</h2>

          <form
            className="box_modal_formu"
            ref={dataRed}
            onSubmit={handleUpdateUser}
          >
            <div className="contex_box_all_inputs">
              <div className="content_box_inputs">
              <label htmlFor="email">Email</label>
              <input type="email" required name="email" placeholder="maria@gmail.com" />
              </div>
              
              <div className="content_box_inputs">
              <label htmlFor="initial_date">Fecha de inicio</label>
              <input type="date" required name="initial_date"  />
              </div>
              
              <div className="content_box_inputs">
              <label htmlFor="final_date">Fecha de Final</label>
              <input type="date" required name="final_date"  />
              </div>
              
               <div className="content_box_inputs">
              <label htmlFor="initial_time">Hora de Entrada</label>
              <input type="time" required name="initial_time"  />
              </div>
              
              <div className="content_box_inputs">
              <label htmlFor="final_time">Hora de Salida</label>
              <input type="time" required name="final_time"  />
              </div> 
              
              <div className="content_box_inputs">
              <label htmlFor="address">Dirrecion</label>
              <input type="text" required name="address" placeholder="bolivia la paz" />
              </div>
              
              <div className="content_box_inputs">
              <label htmlFor="fk_typeuser">Rol</label>
              <select name="fk_typeuser" >
                  <option value="">Elegir el Rol</option>
                  <option value="1">Adminitrador</option>
                  <option value="2">Trabajador</option>
                </select>
              </div>

              <div className="content_box_inputs">
           <label htmlFor="">Cambiar estado</label>
            <select name="status">
              <option value="" >Elegir</option>
              <option value={"active"} >active</option>
            </select>
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
  );
};

export default AddUserModal;
