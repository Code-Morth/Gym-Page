"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import useSidebar from "../../hook/useSidebar"

const SidebarGym = () => {
  const { optionSelect, selectedOption } = useSidebar()

  return (
    <div>
      <div className="box_sidebar_ ">
        <div className="box_image">
          <div className="w-[10rem] h-[10rem]">
            <Image
              className="w-full  h-full"
              src={"/logoMyg.png"}
              alt="logo"
              width={1000}
              height={1000}
            />
          </div>
        </div>
        <div className="box_text_sidebar ">
          <h3 onClick={() => optionSelect(1)}>Usuarios</h3>
          {selectedOption === 1 && (
            <ul className="items_sidebar_content-">
              <Link href={"/dashboard/admin/usuarios/agregarUsuarios"}>
                Agregar Usuarios
              </Link>
              <Link href={"/dashboard/admin/usuarios/todosLosUsuarios"}>
                Todo Los Usuarios
              </Link>
            </ul>
          )}
        </div>

        <div className="box_text_sidebar">
          <h3 onClick={() => optionSelect(2)}>Clientes</h3>
          {selectedOption === 2 && (
            <ul className="items_sidebar_content-">
              <Link href={"/dashboard/admin/cliente/agregarCliente"}>
                Agregar Cliente
              </Link>
              <Link href={"/dashboard/admin/cliente/todosLosClientes"}>
                Todos Los Clientes
              </Link>
              <Link href={"/dashboard/admin/cliente/estadisticas"}>
                Estadísticas
              </Link>
            </ul>
          )}
        </div>

        <div className="box_text_sidebar">
          <h3 onClick={() => optionSelect(3)}>Productos</h3>
          {selectedOption === 3 && (
            <ul className="items_sidebar_content-">
              <Link href={"/dashboard/admin/productos/agregarProductos"}>
                Agregar Productos
              </Link>
              <Link href={"/dashboard/admin/productos/todosLosProductos"}>
                Todo Los Productos
              </Link>
              <Link href={"/dashboard/admin/productos/estadisticas"}>
                Estadísticas
              </Link>
            </ul>
          )}
        </div>

        <div className="box_text_sidebar">
          <h3 onClick={() => optionSelect(4)}>Ventas</h3>

          {selectedOption === 4 && (
            <ul className="items_sidebar_content-">
              <Link href={"/dashboard/admin/ventas/agregarVentas"}>
                Agregar Venta
              </Link>
              <Link href={"/dashboard/admin/ventas/todasLasVentas"}>
                Todas las Ventas
              </Link>
              <Link href={"/dashboard/admin/ventas/estadisticas"}>
                Estadísticas
              </Link>
            </ul>
          )}
        </div>

        <div className="box_text_sidebar">
          <h3 onClick={() => optionSelect(5)}>Membresia</h3>
          {selectedOption === 5 && (
            <ul className="items_sidebar_content-">
              <Link href={"/dashboard/admin/membresia/agregarMembresia"}>
                Agregar Membresia
              </Link>
              <Link href={"/dashboard/admin/membresia/todasLasMembresias"}>
                Todas las Membresias
              </Link>
            </ul>
          )}
        </div>

        <div className="box_text_sidebar">
          <h3 onClick={() => optionSelect(6)}>Contabilidad</h3>

          {selectedOption === 6 && (
            <ul className="items_sidebar_content-">
              <Link href={"/dashboard/admin/contabilidad/agregarGastosExtras"}>
                Agregar gastos extras
              </Link>
              <Link href={"/dashboard/admin/contabilidad/sueldos"}>
                Sueldos
              </Link>
              <Link href={"/dashboard/admin/contabilidad/ingresos"}>
                Ingresos
              </Link>
              <Link href={"/dashboard/admin/contabilidad/egresos"}>
                Egresos
              </Link>
              <Link href={"/dashboard/admin/contabilidad/ganancias"}>
                Ganancias
              </Link>
            </ul>
          )}
        </div>

        <div className="box_text_sidebar">
          <Link className="" href={"/dashboard/admin/lectorQr"}>
            Lector Qr
          </Link>
        </div>

        <div className="box_text_sidebar">
          <Link href="/">Salir</Link>
        </div>
      </div>
    </div>
  )
}

export default SidebarGym
