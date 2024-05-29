"use client"
import React, { useState } from "react"
import { QrReader } from "react-qr-reader"

const QRComponent = () => {
  const [data, setData] = useState("No result")

  alert(data)

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
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text)
            }

            if (!!error) {
              console.info(error)
            }
          }}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  )
}

export default QRComponent
