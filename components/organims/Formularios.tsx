"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import userLocalStoras from "../../hook/userLocalStoras";
import { useAlerts } from "../../hook/useAlerts";
import { Toast } from "primereact/toast";

const Formularios = () => {
  const { agregarLocal } = userLocalStoras();
  const { show, toast } = useAlerts();

  const router = useRouter();

  const handleLogin = (event: any) => {
    event.preventDefault();

    const dataForm = Object.fromEntries(new FormData(event.target));
    dataForm.type = "admin";
    agregarLocal("typeUser", dataForm?.type);
    if (dataForm?.type === undefined) {
      show("Ingresar Cuenta");
      return router.push("/");
    }

    if (dataForm.type == "admin") {
      show(`Bienvenido ${dataForm?.email}`);
      setTimeout(() => {
        router.push("/dashboard/admin");
      }, 1500);
    } else {
      show(`Bienvenido empleaducho`);
      setTimeout(() => {
        router.push("/dashboard/user");
      }, 1500);
    }
  };

  return (
   <>
    <form onSubmit={handleLogin} className="box_formulario">
      <div className="box_imagen_">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={1000}
          height={1000}
          className="w-full h-full"
        />
      </div>
      <div className="box_imputs-">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="amid@gmail.com"
          id="email"
          name="email"
        />
      </div>

      <div className="box_imputs-">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
      </div>
      <button type="submit" className="">
        Ingresar
      </button>
      <Toast ref={toast} position="top-center" />
    </form>
   </>
  );
};

export default Formularios;
