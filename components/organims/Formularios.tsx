"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import userLocalStoras from '../../hook/userLocalStoras'

const Formularios = () => {

  const { agregarLocal } = userLocalStoras()

  const router  =useRouter()


    const handleLogin = (event: any) => {
        event.preventDefault()
    
        const dataForm = Object.fromEntries(new FormData(event.target)) ;
        dataForm.type = "admin";  
        agregarLocal("typeUser",dataForm?.type); 
        dataForm.type === "admin" ? router.push("/dashboard/admin") : router.push("/dashboard/user")
      }

  return (
    <form onSubmit={handleLogin} className="box_formulario">
    <div className="box_imagen_">
      <Image src={"/logo.png"}alt="logo" width={1000} height={1000} className="w-full h-full"/>
    </div>
    <div className="box_imputs-">
    <label htmlFor="email">Email</label>
    <input type="email" placeholder="amid@gmail.com" id="email" name="email"/>
    </div>
   
   <div className="box_imputs-">
   <label htmlFor="password">Password</label>
    <input type="password"  placeholder="********" id="password" name="password" />
   </div>
    <button type='submit' className=''>Ingresar</button>
  </form>
  )
}

export default Formularios
