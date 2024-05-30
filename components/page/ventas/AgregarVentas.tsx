"use client"
import { useEffect, useState } from "react"
import { Dropdown } from "primereact/dropdown"
import "primereact/resources/themes/lara-light-cyan/theme.css"
import getConfig from "../../../utils/getConfig"
import axios from "axios"
import apisPeticion from "@/api/apisPeticion"
import { Toast } from "primereact/toast"
import { useAlerts } from "../../../hook/useAlerts"

const AgregarVentas = () => {
  const [selectedData, setselectedData] = useState(null)
  const [productTableArray, setproductTableArray] = useState<any>([])
  const [totalPrice, settotalPrice] = useState<any>()
  const [dataUsers, setdataUsers] = useState<any>([])
  const [dataProducts, setdataProducts] = useState()
  const [selectedUserName, setselectedUserName] = useState()
  const [selectedUserID, setselectedUserID] = useState()
  const [selectedProductName, setselectedProductName] = useState()

  const { url } = apisPeticion()
  const { show, toast } = useAlerts()

  useEffect(() => {
    axios
      .get(`${url}/product?page=0&size=999999999999999`, getConfig())
      .then((res) => setdataProducts(res.data.data))
      .catch((err) => console.log(err))

    axios
      .get(`${url}/client?page=0&size=999999999999999`, getConfig())
      .then((res) => {
        setdataUsers(res.data.data)
      })
      .catch((err) => console.log(err))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addProductTable = (data: any) => {
    setselectedData(data.target.value.productName)

    console.log("data",data)

    setproductTableArray((prev: any) => [
      ...prev,
      {
        productName: data.target.value.name,
        price: data.target.value.price_sell,
        amount: 1,
        totalPrice: data.target.value.price_sell,
        id: data.target.value.id,
      },
    ])
  }

  const postSale = () => {
    const id = selectedUserID === undefined ? "anonymous" : selectedUserID

    const dataProductTableFinal = productTableArray.map((data: any) => {
      return { fk_product: data.id, quantity: data.amount }
    })

    const finalDataPost = {
      fk_client: id,
      detail: [dataProductTableFinal],
    }

    console.log("finalDataPost",finalDataPost)

    axios
      .post(`${url}/order`, finalDataPost, getConfig())
      .then((res) => {
        if (res.data.success) {
          show("Producto Agregado")
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    const totalPriceSum = productTableArray.reduce(
      (total: any, item: any) => total + item.totalPrice,
      0
    )

    settotalPrice(totalPriceSum)

  }, [productTableArray])

  return (
    <>
      <div className="AgregarVentas main-page">
        <div className="agregar-ventas-container">
          <h1>Formulario de venta</h1>
          <div className="form-container">
            <div className="form-left">
              <label htmlFor="userName">Nombre del cliente</label>
              <Dropdown
                style={{
                  fontSize: "16px",
                  padding: "0.7rem",
                }}
                value={selectedUserName}
                onChange={(e) => {
                  setselectedUserID(e.target.value.id)
                  setselectedUserName(e.target.value.first_name)
                }}
                optionLabel="first_name"
                options={dataUsers}
                editable
                placeholder="Cliente"
                className="w-full md:w-14rem custom-dropdown"
              />
              <label htmlFor="userName">Seleccione productos</label>
              <Dropdown
                style={{
                  fontSize: "16px",
                  padding: "0.7rem",
                }}
                value={selectedProductName}
                onChange={(e) => {
                  setselectedProductName(e.target.value.name)
                  addProductTable(e)
                }}
                options={dataProducts}
                optionLabel="name"
                editable
                placeholder="Producto"
                className="w-full md:w-14rem custom-dropdown"
              />
              <label>Carrito de compras</label>
            </div>
            <div className="tabla-container">
              <table>
                <thead>
                  <tr>
                    <th>Nombre del producto</th>
                    <th>Precio del producto</th>
                    <th>Cantidad del producto</th>
                    <th>Precio total</th>
                  </tr>
                </thead>
                <tbody>
                  {productTableArray?.map((data: any, index: number) => (
                    <tr key={index}>
                      <td>{data?.productName}</td>
                      <td>{data?.price}</td>
                      <td>
                        <input
                          onChange={(event) => {
                            const newAmount = Number(event.target.value)
                            setproductTableArray((prev: any) =>
                              prev.map((item: any, i: number) =>
                                i === index
                                  ? {
                                      ...item,
                                      amount: newAmount,
                                      totalPrice:
                                        newAmount *
                                        productTableArray[index].price,
                                    }
                                  : item
                              )
                            )
                          }}
                          type="number"
                          value={data?.amount}
                          min={0}
                        />
                      </td>
                      <td>
                        <input
                          disabled
                          type="number"
                          value={data?.totalPrice}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={postSale} className="button-default">
              Realizar Venta
            </button>
            <p>Total:${totalPrice}</p>
          </div>
        </div>
        <Toast ref={toast} position="top-center" />
      </div>
    </>
  )
}

export default AgregarVentas
