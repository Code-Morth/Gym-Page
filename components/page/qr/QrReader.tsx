"use client"
import apisPeticion from "@/api/apisPeticion"
import React, { useEffect, useState } from "react"
import { QrReader } from "react-qr-reader"
import { useAlerts } from "../../../hook/useAlerts"
import axios from "axios"
import getConfig from "../../../utils/getConfig"
import { Toast } from 'primereact/toast'

const QRComponent = () => {
  const [data, setData] = useState()
  const { url } = apisPeticion()
  const { show, toast } = useAlerts()

  console.log("data",data)

  useEffect(() => {
    show("Dia contado Correctamente")

    axios
      .put(
        `${url}/client_assist/${data}`,
        {
          email: "ivan.tapia@diurvanconsultores.com",
          password: "P@ssw0rd",
        },
        getConfig()
      )
      .then((res: any) => {
        show("Dia contado Correctamente")
        console.log("Dia contado Correctamente")
        if (res.data.success) {
          show("Dia contado Correctamente")
        }
      })
      .catch((err) => console.log(err))

  }, [data])

  return (
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
              setData(result?.text)
            }

            if (!!error) {
            }
          }}
          style={{ width: "100%" }}
        />
      </div>
      <Toast ref={toast} position="top-center" />

    </div>
  )
}

export default QRComponent
