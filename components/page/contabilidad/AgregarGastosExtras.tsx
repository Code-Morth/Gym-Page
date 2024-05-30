import React, { useRef } from "react";
import { useAlerts } from "../../../hook/useAlerts";
import { Toast } from "primereact/toast";
import apisPeticion from "@/api/apisPeticion";
import axios from "axios";
import getConfig from "../../../utils/getConfig";

const AgregarGastosExtras = () => {
  const { show, toast } = useAlerts();
  const gastosRef = useRef<any>(null);
  const { url } = apisPeticion();

  const handleContabilidad = (event: any) => {
    event.preventDefault();

    const dataContabilidad = Object.fromEntries(new FormData(event.target));

    console.log(dataContabilidad);

    axios
      .post(`${url}/expense`, dataContabilidad, getConfig())
      .then((res) => {
        if (res.data.success) {
          show("Gastos Agregado");
          gastosRef.current?.reset();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="box_add_gastos main-page ">
      <form
        ref={gastosRef}
        onSubmit={handleContabilidad}
        className="for_box_data_add_contabilidad"
      >
        <h2>Registrar Gastos</h2>
        <div className="content_box_inputs">
          <label htmlFor="description">Description</label>
          <input
            required
            type="text"
            placeholder="Description"
            name="description"
            id="description"
          />
        </div>
        <div className="content_box_inputs">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            required
            type="text"
            placeholder="$900"
            name="price_sell"
            id="cantidad"
          />
        </div>
        <div className="button_gastos_">
          <button type="submit" className="button-default">
            Guardar Gastos
          </button>
        </div>
      </form>
      <Toast ref={toast} position="top-center" />
    </div>
  );
};

export default AgregarGastosExtras;
