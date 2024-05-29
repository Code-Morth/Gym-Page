"use client"
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import menbresia from "@/../json/menbresia.json";
import axios from "axios";
import getConfig from "../../../../../../utils/getConfig";
import apisPeticion from "@/api/apisPeticion";

export default function page () {

  const [customers, setCustomers] = useState<any>([]);
  const { url } = apisPeticion()

  useEffect(() => {

    axios.get(`${url}/membership`,getConfig()).then(res => {
      setCustomers(res.data.data)
    
    }).catch(err => console.log(err))
    
  }, []);

    return (
      <div className="box_all_producs main-page ">
      <h3>Todo Los Productos</h3>
      

      <div className="tabla-container">
        <DataTable
          className="data-table border"
          value={customers}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            className="column "
            field="name"
            header="Nombre"
            style={{ width: "8%" }}
          ></Column>
          <Column
            className="column"
            field="description"
            header="Description"
            style={{ width: "8%" }}
          ></Column>
          <Column
            className="column"
            field="price"
            header="Precio"
            style={{ width: "8%" }}
          ></Column>
          <Column
            className="column"
            field="permiso"
            header="Permiso"
            style={{ width: "8%" }}
          ></Column>
          <Column
            className="column"
            field="duration"
            header="Duration"
            style={{ width: "8%" }}
          ></Column>
          <Column
            className="column"
            field="status"
            header="Acciones"
            style={{ width: "8%" }}
          ></Column>
        </DataTable>
      </div>
    </div>
    )
  }
  