"use client"
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import menbresia from "@/../json/menbresia.json";

export default function page () {

  const [customers, setCustomers] = useState<any>([]);

  useEffect(() => {
    setCustomers(menbresia);
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
            field="nombre"
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
            field="precio"
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
            field="acciones"
            header="Acciones"
            style={{ width: "8%" }}
          ></Column>
        </DataTable>
      </div>
    </div>
    )
  }
  