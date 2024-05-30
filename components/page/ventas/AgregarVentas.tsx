"use client"
import { useEffect, useState } from "react"
import { Dropdown } from "primereact/dropdown"
import "primereact/resources/themes/lara-light-cyan/theme.css"
import todosLosProductos from "../../../json/todosLosProductos.json"
import todosLosUsuarios from "../../../json/todosLosUsuarios.json"

const AgregarVentas = () => {
  const [products, setproducts] = useState<any>([])
  const [userName, setuserName] = useState<any>([])
  const [selectedData, setselectedData] = useState(null)
  const [selectedUser, setselectedUser] = useState<any>(null)
  const [productTableArray, setproductTableArray] = useState<any>([])
  const [totalPrice, settotalPrice] = useState<any>()

  const addProductTable = (data: any) => {
    setselectedData(data.target.value.productName)

    setproductTableArray((prev: any) => [
      ...prev,
      {
        productName: data.target.value.productName,
        price: data.target.value.price,
        amount: 1,
        totalPrice: data.target.value.price,
      },
    ])
  }

  const postSale = () => {
    const id = selectedUser?.ci === undefined ? "anonymous" : selectedUser?.ci

    console.log("dataFinal", { [id]: [productTableArray] })
  }

  useEffect(() => {
    const totalPriceSum = productTableArray.reduce(
      (total: any, item: any) => total + item.totalPrice,
      0
    )

    settotalPrice(totalPriceSum)
  }, [productTableArray])

  useEffect(() => {
    setproducts(todosLosProductos)
    setuserName(todosLosUsuarios)
  }, [])

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
                optionLabel="fullName"
                value={selectedUser}
                onChange={(e) => setselectedUser(e.value)}
                options={userName}
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
                value={selectedData}
                onChange={(e) => addProductTable(e)}
                options={products}
                optionLabel="productName"
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
      </div>
    </>
  )
}

export default AgregarVentas
