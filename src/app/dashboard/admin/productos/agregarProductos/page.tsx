"use client"

import { Toast } from "primereact/toast";
import { useAlerts } from "../../../../../../hook/useAlerts";
import { useRef, FormEvent } from "react";

export default function Page () {

  const { show, toast } = useAlerts();
  const formRef = useRef<any>(null);

  const handleProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const producInfo = Object.fromEntries(new FormData(event.currentTarget));
    const datVacio = producInfo?.nombre_Producto && producInfo?.stock && producInfo?.precio_de_Venta && producInfo?.precio_de_Compra;
    if(datVacio !== ""){
      show("Producto Agregado");
      return formRef.current?.reset();  
    } else {
      return show("Complete todos los campos");
    }
  };

  const setCustomValidityMessage = (event: React.InvalidEvent<HTMLInputElement>) => {
    event.target.setCustomValidity("Este campo es obligatorio");
  };

  const clearCustomValidityMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.setCustomValidity("");
  };

  return (
    <div className="box_add_product main-page">

      <form ref={formRef} onSubmit={handleProduct} className="box_info_form">
        <h3>Registro De Producto</h3>
        <div className="info_context_formt">
          <div className="inputs_for">
            <label htmlFor="nombreProducto"> Nombre Producto</label>
            <input 
              type="text" 
              required 
              placeholder="nombreProducto" 
              name="nombre_Producto" 
              id="nombreProducto"
              onInvalid={setCustomValidityMessage}
              onInput={clearCustomValidityMessage}
            />
          </div>
          <div className="inputs_for">
            <label htmlFor="stock"> Stock</label>
            <input 
              type="text" 
              required 
              placeholder="MasterVitamina" 
              name="stock" 
              id="stock"
              onInvalid={setCustomValidityMessage}
              onInput={clearCustomValidityMessage}
            />
          </div>
          <div className="inputs_for">
            <label htmlFor="precioUnitarioDeVenta"> Precio de Venta</label>
            <input 
              type="text" 
              required 
              placeholder="$900" 
              name="precio_de_Venta" 
              id="precioUnitarioDeVenta"
              onInvalid={setCustomValidityMessage}
              onInput={clearCustomValidityMessage}
            />
          </div>
          <div className="inputs_for">
            <label htmlFor="precioDeCompra"> Precio de Compra</label>
            <input 
              type="text" 
              required 
              placeholder="$500" 
              name="precio_de_Compra" 
              id="precioDeCompra"
              onInvalid={setCustomValidityMessage}
              onInput={clearCustomValidityMessage}
            />
          </div>
        </div>

        <button className="button-default">Registrar Productos</button>
      </form>
      <Toast ref={toast} position="top-center" />
    </div>
  )
}
