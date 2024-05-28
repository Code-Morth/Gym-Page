"use client"

import { useRef } from "react";
import { useAlerts } from "../../../../../../hook/useAlerts";
import { Toast } from "primereact/toast";

export default function page () {

  const { show, toast } = useAlerts();
  const formRef = useRef<any>(null)

  const handleContabilidad = (event: any) => {
    event.preventDefault()

    const dataContabilidad = Object.fromEntries(new FormData(event.target))  ;
    
    if(dataContabilidad){
      show("Gastos Agregado");
      formRef.current?.reset();  
    }

  }


    return (
      <div  className="box_add_gastos main-page ">
      <form ref={formRef} onSubmit={handleContabilidad} className="for_box_data_add_contabilidad">
        <h2>Registrar Gastos</h2>
        <div className="content_box_inputs">
          <label htmlFor="description">Description</label>
          <input required type="text" placeholder="Description" name="description" id="description"/>
        </div>
        <div className="content_box_inputs">
          <label htmlFor="cantidad">Cantidad</label>
          <input required type="text" placeholder="$900" name="cantidad" id="cantidad"/>
        </div>
        <div className="py-[1rem] m-auto">
        <button type="submit" className="button-default">Guardar Gastos</button>
        </div>
        
      </form>
      <Toast ref={toast} position="top-center" />
    </div>
    )
  }
  