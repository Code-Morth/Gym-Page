import apisPeticion from "@/api/apisPeticion"
import { useAlerts } from "../../../hook/useAlerts"
import { useRef } from "react"
import getConfig from "../../../utils/getConfig"
import axios from "axios"
import { Toast } from "primereact/toast"

const AgregarMembresias = () => {
  const { show, toast } = useAlerts()
  const { url } = apisPeticion()
  const formRef = useRef<any>(null)

  const handleMenbresia = (event: any) => {
    event.preventDefault()

    const dataMenbresia = Object.fromEntries(new FormData(event.target))

    axios
      .post(`${url}/membership`, dataMenbresia, getConfig())
      .then((res) => {
        if (res.data.success) {
          show("Menbresia Creada")
          formRef.current.resert()
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="main-page box_add_menbresia_">
      <h2>Agregar Menbresía</h2>
      <form ref={formRef} onSubmit={handleMenbresia} className="box_inputs_ ">
        <div className="content_box_inputs">
          <label htmlFor="nombre">Nombre</label>
          <input
            required
            type="text"
            placeholder="title mebresia"
            name="name"
            id="nombre"
          />
        </div>

        <div className="content_box_inputs">
          <label htmlFor="description">Description</label>
          <input
            required
            type="text"
            placeholder="description"
            name="description"
            id="description"
          />
        </div>

        <div className="content_box_inputs">
          <label htmlFor="precio">Precio</label>
          <input
            required
            type="text"
            placeholder="$5000"
            name="price"
            id="precio"
          />
        </div>

        <div className="content_box_inputs">
          <label htmlFor="duracion">Duracion</label>
          <input
            required
            type="text"
            placeholder="Dias de Duracion"
            name="duration"
            id="duracion"
          />
        </div>

        <div className="content_box_inputs">
          <label htmlFor="permisos">Permisos</label>
          <input
            required
            type="text"
            placeholder="Dias de permiso"
            name="permisos"
            id="permisos"
          />
        </div>

        <div className="flex items-center justify-center pt-[2rem]">
          <button
            className="button-default !text-[1.2rem] font-bold"
            type="submit"
          >
            Agregar Menbresía
          </button>
        </div>
      </form>

      <Toast ref={toast} position="top-center" />
    </div>
  )
}

export default AgregarMembresias
