"use client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import productos from "@/../json/productos.json";
import axios from "axios";
import apisPeticion from "@/api/apisPeticion";
import getConfig from "../../../../../../utils/getConfig";

export default function Page() {
  const [customers, setCustomers] = useState<any>([]);
  const { url } = apisPeticion();
  const [names, setname] = useState("");

  useEffect(() => {
    axios
      .get(`${url}/product`, getConfig())
      .then((res) => setCustomers(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  const capture = (e: any) => {
    setname(e.target.value);
  };

  const filterCustomers = customers.filter((custon: any) => {
    const namesss = custon?.name.toLowerCase().includes(names.toLowerCase());
    return namesss;
  });

  return (
    <div className="box_all_producs main-page ">
      <h3>Todo Los Productos</h3>
      <input onChange={capture} type="text" placeholder="Producto" />

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
            field="name"
            header="Nombre"
            style={{ width: "8%" }}
          ></Column>
          <Column
            className="column"
            field="price_buy"
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
            field="status"
            header="Acciones"
            style={{ width: "8%" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
