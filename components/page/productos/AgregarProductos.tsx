import React, { FormEvent, useRef } from 'react'
import { useAlerts } from '../../../hook/useAlerts';
import apisPeticion from '@/api/apisPeticion';
import axios from 'axios';
import getConfig from '../../../utils/getConfig';
import { Toast } from 'primereact/toast';

const AgregarProductos = () => {

    const { show, toast } = useAlerts();
    const formRef = useRef<any>(null);
    const { url } = apisPeticion();
  
    const handleProduct = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const producInfo = Object.fromEntries(new FormData(event.currentTarget));
  
      axios.post( `${url}/product`,producInfo,getConfig()).then(res => {
        if (res.data.success) {
          show("Producto Agregado");
          formRef.current.reset();
        }
      }).catch(err => console.log(err))
     
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
              name="name"
              id="nombreProducto"
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
            />
          </div>
          <div className="inputs_for">
            <label htmlFor="precioUnitarioDeVenta"> Precio de Venta</label>
            <input
              type="text"
              required
              placeholder="$900"
              name="price_buy"
              id="precioUnitarioDeVenta"
            />
          </div>
          <div className="inputs_for">
            <label htmlFor="precioDeCompra"> Precio de Compra</label>
            <input
              type="text"
              required
              placeholder="$500"
              name="price_sell"
              id="precioDeCompra"
            />
          </div>
        </div>

        <button className="button-default">Registrar Productos</button>
      </form>
      <Toast ref={toast} position="top-center" />
    </div>
  )
}

export default AgregarProductos