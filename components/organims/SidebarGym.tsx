"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useSidebar from "../../hook/useSidebar";
import { usePathname, useRouter } from "next/navigation";
import userLocalStoras from "../../hook/userLocalStoras";

const SidebarGym = () => {
  const { optionSelect, selectedOption } = useSidebar();
  const { eliminarLocal  , obtenerLocal} = userLocalStoras();

  const router =useRouter()

  const path = usePathname();

  const salir = () => {
    eliminarLocal("fk_typeuser");
    eliminarLocal("token");

    window.location.reload();
  };

  const isAdminRoute = path.startsWith("/dashboard/admin");
  const isUserRoute = path.startsWith("/dashboard/user");

  const user :any = obtenerLocal("fk_typeuser")
  const navegar = () => {
    
    if(user  === 1){
      router.push("/dashboard/admin")
    }else{
      router.push("/dashboard/user")
    }
  }

  return (
    <div className="box_box_box_sidebar">
      <div className="box_sidebar_  ">
        <div className="box_image">
          <div className="image_next_box">
            <Image
            onClick={navegar}
              className="w-full  h-full"
              src={"/logo.png"}
              alt="logo"
              width={1000}
              height={1000}
            />
          </div>
        </div>
        {isAdminRoute && (
          <div className="box_text_sidebar ">
            <h3 onClick={() => optionSelect(1)}>Usuario</h3>
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
        )}

        <div className="box_text_sidebar">
          <h3 onClick={() => optionSelect(2)}>Clientes</h3>
          {selectedOption === 2 && (
            <>
              {isAdminRoute && (
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
              {isUserRoute && (
                <ul className="items_sidebar_content-">
                  <Link href={"/dashboard/user/cliente/agregarCliente"}>
                    Agregar Cliente
                  </Link>
                  <Link href={"/dashboard/user/cliente/todosLosClientes"}>
                    Todos Los Clientes
                  </Link>
                </ul>
              )}
            </>
          )}
        </div>

        <div className="box_text_sidebar">
          <h3 onClick={() => optionSelect(3)}>Productos</h3>
          {selectedOption === 3 && (
            <>
              {isAdminRoute && (
                <ul className="items_sidebar_content-">
                  <Link href={"/dashboard/admin/productos/agregarProductos"}>
                    Agregar Productos
                  </Link>
                  <Link href={"/dashboard/admin/productos/todosLosProductos"}>
                    Todos Los Productos
                  </Link>
                  <Link href={"/dashboard/admin/productos/estadisticas"}>
                    Estadísticas
                  </Link>
                </ul>
              )}
              {isUserRoute && (
                <ul className="items_sidebar_content-">
                  <Link href={"/dashboard/user/productos/agregarProductos"}>
                    Agregar Productos
                  </Link>
                  <Link href={"/dashboard/user/productos/todosLosProductos"}>
                    Todos Los Productos
                  </Link>
                </ul>
              )}
            </>
          )}
        </div>

        <div className="box_text_sidebar">
          <h3 onClick={() => optionSelect(4)}>Ventas</h3>

          {selectedOption === 4 && (
            <>
              {isAdminRoute && (
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
              {isUserRoute && (
                <ul className="items_sidebar_content-">
                  <Link href={"/dashboard/user/ventas/agregarVentas"}>
                    Agregar Venta
                  </Link>
                </ul>
              )}
            </>
          )}
        </div>

        {isAdminRoute && (
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
        )}

        <div className="box_text_sidebar">
          <h3 onClick={() => optionSelect(6)}>Contabilidad</h3>

          {selectedOption === 6 && (
            <>
              {isAdminRoute && (
                <ul className="items_sidebar_content-">
                  <Link
                    href={"/dashboard/admin/contabilidad/agregarGastosExtras"}
                  >
                    Agregar gastos extras
                  </Link>
                  <Link href={"/dashboard/admin/contabilidad/sueldos"}>
                    Sueldos/Ingresos/Egresos
                  </Link>
                </ul>
              )}
              {isUserRoute && (
                <ul className="items_sidebar_content-">
                  <Link
                    href={"/dashboard/user/contabilidad/agregarGastosExtras"}
                  >
                    Agregar gastos extras
                  </Link>
                </ul>
              )}
            </>
          )}
        </div>

        <div className="box_text_sidebar">
          {isAdminRoute && (
            <Link className="" href={"/dashboard/admin/lectorQr"}>
              Lector Qr
            </Link>
          )}
          {isUserRoute && (
            <Link className="" href={"/dashboard/user/lectorQr"}>
              Lector Qr
            </Link>
          )}
        </div>

        <div className="box_text_sidebar">
          <Link href="#" onClick={salir}>
            Salir
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarGym;
