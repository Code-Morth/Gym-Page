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
        setload(true);
      })
      .catch((error) => console.log(error));

    // Fetch clients data
    axios
      .get(`${url}/client?page=0&size=99999999`, getConfig())
      .then((res) => {
        const clients = res.data.data;
        setClientes(clients);
        const clientsToNotify = checkClientsForRenewal(clients);
        setClientesPorRenovar(clientsToNotify);
      })
      .catch((err) => console.log(err));
  }, []);

  const checkClientsForRenewal = (clients: any[]) => {
    const clientsToNotify = clients
      .filter((client) => {
        if (!client.start_date || !client.duration || client.quantity === null) {
          return false;
        }

        const startDate = dayjs(client.start_date);
        const currentDate = dayjs();

        const expirationDate = startDate.add(client.duration, "day");
        const daysUntilExpiration = expirationDate.diff(currentDate, 'day');

        if (client.status === "deleted") {
          return true;
        } else if (client.status === "active") {
          return daysUntilExpiration <= 4 && daysUntilExpiration >= 0;
        }
        return false;
      })
      .map((client) => {
        const startDate = dayjs(client.start_date);
        const currentDate = dayjs();
        const expirationDate = startDate.add(client.duration, "day");
        const daysUntilExpiration = expirationDate.diff(currentDate, 'day');

        const message =
          client.status === "deleted"
            ? `Cliente vencido hace ${Math.abs(daysUntilExpiration)} días`
            : `Faltan ${daysUntilExpiration} días para vencer su membresía`;

        return {
          ...client,
          message,
        };
      });
    return clientsToNotify;
  };

  return (
    <div className="box-notification_context">
      <div className="box-notification_context_two">
        <div className="box-notification_context_thre">
          <div className="box-notification_context_for">
            <h2>Bienvenido</h2>
            <h2>{userData?.first_name}</h2>
          </div>

          {load ? (
            userData?.fk_typeuser === 2 ? (
              <h2 className="text-notify">Usuario: Trabajador</h2>
            ) : userData?.fk_typeuser === 1 ? (
              <h2 className="text-notify">Usuario: Administrador</h2>
            ) : null
          ) : (
            <Loader />
          )}
        </div>

        {clientesPorRenovar.length > 0 && (
          <ClienteNotifiy clients={clientesPorRenovar} load={load} />
        )}
      </div>
    </div>
  );
};

export default MainPage;
