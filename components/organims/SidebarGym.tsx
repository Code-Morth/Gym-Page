"use client"
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import useSidebar from '../../hook/useSidebar';
        
        

const SidebarGym = ( ) => {

  const { optionSelect, selectedOption } = useSidebar();


  return (
    <div>

<div className='box_sidebar_ ' >

  <div className='box_image'>
    <div className='image_next_box'>
    <Image className='w-full  h-full' src={"/logo.png"} alt='logo' width={1000} height={1000}/>
    </div>
  </div>
       <div className='box_text_sidebar '>
        <h3 onClick={() => optionSelect(1)}>Usuario</h3>
        {selectedOption === 1 && (
            <ul className='items_sidebar_content-'>
              <Link href={"#"}>Agregar Usuarios</Link>
              <Link href={"#"}>Todo Los Usuarios</Link>
            </ul>
          )}
       
       </div>

       <div className='box_text_sidebar'>
       <h3 onClick={() => optionSelect(2)}>Clientes</h3>
          {selectedOption === 2 && (
            <ul className='items_sidebar_content-'>
              <Link href={"#"}>Agregar Cliente</Link>
              <Link href={"#"}>Todo Los Clientes</Link>
              <Link href={"#"}>Estadísticas</Link>
            </ul>
          )}
       
       </div>

       <div className='box_text_sidebar'>
        <h3 onClick={() => optionSelect(3)}>Productos</h3>
        {
          selectedOption === 3 && <ul className='items_sidebar_content-'>
          <Link href={"#"}>Agregar Productos</Link>
          <Link href={"#"}>Todo Los Productos</Link>
          <Link href={"#"}>Estadísticas</Link>
        </ul>
        }
        
       </div>


       <div className='box_text_sidebar'>
        <h3 onClick={() => optionSelect(4)}>Ventas</h3>

        {
          selectedOption === 4 && <ul className='items_sidebar_content-'>
          <Link href={"#"}>Agregar Venta</Link>
          <Link href={"#"}>Todas las Ventas</Link>
          <Link href={"#"}>Estadísticas</Link>
        </ul>
        }
        
       </div>

       <div className='box_text_sidebar'>
        <h3 onClick={() => optionSelect(5)}>Menbresia</h3>
        {
          selectedOption === 5 && <ul className='items_sidebar_content-'>
          <Link href={"#"}>Agregar Menbresia</Link>
          <Link href={"#"}>Todas las Menbresias</Link>
        </ul>
        }
        
       </div>

       <div className='box_text_sidebar'>
        <h3 onClick={() => optionSelect(6)}>Contabilidad</h3>

        {
          selectedOption === 6 && <ul className='items_sidebar_content-'>
          <Link href={"#"}>Agregar Contabilidad</Link>
          <Link href={"#"}>Sueldos</Link>
          <Link href="/">Ingresos / Egresos</Link>
        </ul>
        }
        
       </div>

       <div className='box_text_sidebar'>
          <Link className='' href={"#"}>Lector Qr</Link>
          
       </div>
       
       <div className="box_text_sidebar">
            <Link href="/">Salir</Link>
          </div>


    </div>
   
      
    </div>
  )
}

export default SidebarGym
