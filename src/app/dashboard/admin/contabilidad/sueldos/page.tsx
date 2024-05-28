"use client";
import { useEffect, useState } from "react";
import sueldos from "@/../json/sueldos.json";




export default function Page() {
  const [customers, setCustomers] = useState<any>([]);

  useEffect(() => {
    setCustomers(sueldos);
  }, []);


  const getRandomName = () => {
    const names = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];
    return names[Math.floor(Math.random() * names.length)];
  };


  const filterSueldo = customers.filter((sueldo: any) => sueldo?.pago === "false");
  const filterSueldoPagado = customers.filter((sueldo: any) => sueldo?.pago === "true");

  const changePago = (index: number) => {
    setCustomers((prevCustomers: any) =>
      prevCustomers.map((customer: any, i: number) =>
        i === index ? { ...customer, pago: "true", pagado_por: getRandomName() } : customer
      )
    );
  };

  return (
    <div className="main_principal_ main-page">
      <div className="box_content_sueldos">
        <h2>Sueldos</h2>
        <div className="tabla-container-2">
          <table className="data-table border">
            <thead>
              <tr>
                <th>Nombre completo</th>
                <th>Fecha inicio</th>
                <th>Fecha final</th>
                <th>CI</th>
                <th>Sueldo</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filterSueldo.map((sueldo: any, index: number) => (
                <tr key={index}>
                  <td>{sueldo.name}</td>
                  <td>{sueldo.fecha_inicio}</td>
                  <td>{sueldo.fecha_final}</td>
                  <td>{sueldo.ci}</td>
                  <td>{sueldo.sueldo}</td>
                  <td
                    className="cursor-pointer duration-300 ease-in-out hover:bg-blue-500 hover:font-extrabold"
                    onClick={() => changePago(index)}
                  >
                    Pagar
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="box_content_sueldos">
        <h2>Sueldos Pagados</h2>
        <div className="tabla-container-1">
          <table className="data-table border">
            <thead>
              <tr>
                <th>Nombre completo</th>
                <th>Fecha inicio</th>
                <th>Fecha final</th>
                <th>CI</th>
                <th>Sueldo</th>
                <th>Pagado por</th>
               
              </tr>
            </thead>
            <tbody>
              {filterSueldoPagado.map((sueldo: any, index: number) => (
                <tr key={index}>
                  <td>{sueldo.name}</td>
                  <td>{sueldo.fecha_inicio}</td>
                  <td>{sueldo.fecha_final}</td>
                  <td>{sueldo.ci}</td>
                  <td>{sueldo.sueldo}</td>
                  <td>{sueldo.pagado_por}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
