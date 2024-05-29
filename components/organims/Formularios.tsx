"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import userLocalStoras from "../../hook/userLocalStoras";
import { useAlerts } from "../../hook/useAlerts";
import { Toast } from "primereact/toast";
import apisPeticion from "@/api/apisPeticion";
import axios from "axios";

const Formularios = () => {
  const { agregarLocal } = userLocalStoras();
  const { show, toast } = useAlerts();

  const { login } = apisPeticion();
  const router = useRouter();

  const handleLogin = (event: any) => {
    event.preventDefault();

    const dataForm = Object.fromEntries(new FormData(event.target));

    axios
      .post(`${login}`, dataForm)
      .then((res) => {
        if (res.data.success) {
          agregarLocal("fk_typeuser", res.data.data?.fk_typeuser);
          agregarLocal("token", res.data.data?.token);
          if (res.data.data?.fk_typeuser === 1) {
            show("Bienvenido Admin");
            setTimeout(() => {
              router.push("/dashboard/admin");
            }, 1000);
          } else {
            show(`Bienvenido empleaducho`);
            setTimeout(() => {
              router.push("/dashboard/user");
            }, 1000);
          }
        } else {
          show("Ingresar Cuenta");
        }
      })
      .catch((err) => console.log(err));
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
            priority
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
