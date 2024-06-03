"use client"
import apisPeticion from "@/api/apisPeticion"
import React, { useEffect, useState } from "react"
import { QrReader } from "react-qr-reader"
import { useAlerts } from "../../../hook/useAlerts"
import axios from "axios"
import getConfig from "../../../utils/getConfig"
import { Toast } from "primereact/toast"
import { useRouter } from "next/navigation"

const QRComponent = () => {
  const [id, setid] = useState()
  const { url } = apisPeticion()
  const { show, toast } = useAlerts()
  const [userData, setuserData] = useState<any>(undefined)
  const [userName, setuserName] = useState<any>("")
  const [userPassword, setuserPassword] = useState("")

  const router = useRouter()

  useEffect(() => {
    axios
      .get(`${url}/client/${id}`, getConfig())
      .then((res: any) => setuserData(res.data.data))
      .catch((error: any) => console.log(error))
  }, [id])

  console.log("userData", userData)

  const putAsisstance = () => {
    axios
      .put(
        `${url}/client_assist/${id}`,
        {
          email: userName,
          password: userPassword,
        },
        getConfig()
      )
      .then((res: any) => {
        if (res.data.success) {
          router.push("/dashboard/admin/lectorQr")
          show(
            `Se efectuo la operacion correctamente de ${userData?.first_name} ${userData?.last_name1} ${userData?.last_name2} , con correo ${userData?.email}, numero ${userData?.phone}, CI ${userData?.ci} , y status ${userData?.status} `
          )
        }
        if (!res.data.success) {
          router.push("/dashboard/admin/lectorQr")
          show("Hubo un problema al registrar la asistencia")
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="QrReader">
      <div className="qr-reader-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <div
            style={{
              width: "50rem",
              height: "50rem",
              border: "0.2rem solid #FFFF",
            }}
          >
            <QrReader
              onResult={(result: any, error: any) => {
                if (!!result) {
                  setid(result?.text)
                }

                if (!!error) {
                }
              }}
              style={{ width: "100%" }}
            />
          </div>
          <Toast ref={toast} position="top-center" />
        </div>
        {userData && (
          <div className="data-user">
            <div className="data-container">
              <label>Usuario</label>
              <input
                onChange={(data) => setuserName(data.target.value)}
                type="text"
              />
              <label>Contraseña</label>
              <input
                onChange={(data) => setuserPassword(data.target.value)}
                type="password"
              />
              <button className="button-default" onClick={putAsisstance}>
                Agregar asistencia
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QRComponent
