"use client";
import React, { useEffect, useState } from "react";
import userLocalStoras from "../../hook/userLocalStoras";
import apisPeticion from "@/api/apisPeticion";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import DashboardUser from "../organims/DashboardUser";
import ClienteNotifiy from "../organims/notifi/ClienteNotifiy";
import Loader from "../loader/Loader";
import dayjs from "dayjs";

const MainPage = () => {

    const [userData, setuserData] = useState<any>(null);
    const [load, setload] = useState<any>(false);
    const [clientes, setClientes] = useState<any[]>([]);
    const [clientesPorRenovar, setClientesPorRenovar] = useState<any[]>([]);
  
    const { url } = apisPeticion();
    const { obtenerLocal } = userLocalStoras();
  
    useEffect(() => {
      const idUser = obtenerLocal("user");
  
      // Fetch user data
      axios
        .get(`${url}/user/${idUser}`, getConfig())
        .then((res) => {
          const { first_name, fk_typeuser } = res.data.data;
          const userData = { first_name, fk_typeuser };
          setuserData(userData);
          setload(true)
        })
        .catch((error) => console.log(error));
  
      // Fetch clients data
      axios
        .get(`${url}/client?page=0&size=99999999`, getConfig())
        .then((res) => {
          const clients = res.data.data;
          setClientes(clients);
          setClientesPorRenovar(clients);
        })
        .catch((err) => console.log(err));
    }, []);
  
    const checkClientsForRenewal = (clients: any[]) => {
      // console.log("dfadasfa",today)
      const clientsToNotify = clients.filter((client) => {
        if (!client.start_date || !client.duration || client.quantity === null) {
          return false;
        }
        //formatando la fecha que recibimos de la peticion
        const todays = dayjs(client.start_date).format(" YYYY-MM-DD ");
        //obteniendo fecha actual
        const fechaactual = dayjs();
  
        //almacenando la los dias de duracion para sumar con la fecha
        const sum = client.duration;
        console.log(sum);
        // sumando las fechas y formateando en fecha otra ves
        const newDate = dayjs(todays).add(sum, "day").format("YYYY-MM-DD");
        // aqui usamos el metodo isAfter() para saber si la fecha actual es mayor a la fecha que deseamos comparar
        if (fechaactual.isAfter(newDate)) {
          setClientesPorRenovar(clientsToNotify);
        }
      });
    };

  return (
    <div className="w-full min-h-screen max-h-auto bg-[white] flex  justify-around">
    <div className="w-[100%]  max-h-auto min-h-screen flex flex-col gap-[10rem]  items-center ">
      <div className="w-full h-[10rem] bg-[black] flex gap-[2rem] justify-between items-center px-[10rem]">
        <div className="flex gap-[3rem] text-[white] items-center justify-center font-extrabold">
          <h2 className="text-[3rem]">Bienvenido</h2>
          <h2 className="text-[3rem] underline">{userData?.first_name}</h2>
        </div>

        {load ? (
          userData?.fk_typeuser === 2 ? (
            <h2 className="text-[3rem] text-[white] font-extrabold ">
              Usuario : Trabajador
            </h2>
          ) : userData?.fk_typeuser === 1 ? (
            <h2 className="text-[3rem] text-[white] font-extrabold ">
              Usuario : Administrador
            </h2>
          ) : null
        ) : (
          <Loader />
        )}
      </div>

      <div className="dahsboard_stadisticas ">
        <DashboardUser />
      </div>
    </div>

    <div className="bg-black text-textoSideBar flex flex-col min-w-[35rem] max-w-full h-full  overflow-y-scroll max-h-screen pt-[4rem]">
      {clientesPorRenovar.length > 0 && (
        <ClienteNotifiy clients={clientesPorRenovar} load={load}/>
      )}
    </div>
  </div>
  )
}

export default MainPage
