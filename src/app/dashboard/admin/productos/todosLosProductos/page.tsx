"use client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import productos from "@/../json/productos.json";

export default function page() {
  const [customers, setCustomers] = useState<any>([]);
  const [name, setname] = useState("")

  useEffect(() => {
    setCustomers(productos);
  }, []);

  const capture = (e:any) => {
     setname(e.target.value)
  }


  const filterCustomers = customers.filter((custon:any) => {

    const names = custon?.nombre.toLowerCase().includes(name.toLowerCase());
    return names;
  })

  return (
    <div className="box_all_producs main-page ">
      <h3>Todo Los Productos</h3>
      <input  onChange={capture} type="text" placeholder="Producto" />

      <div className="tabla-container">
        <DataTable
          className="data-table border"
          value={filterCustomers}
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
            field="precio"
            header="Precio"
            style={{ width: "8%" }}
          ></Column>
          <Column
            className="column"
            field="stock"
            header="stock"
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
  );
}
