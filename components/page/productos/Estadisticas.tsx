import apisPeticion from '@/api/apisPeticion'
import axios from 'axios'
import { Chart } from 'primereact/chart'
import { useEffect, useState } from 'react'
import getConfig from '../../../utils/getConfig'

// Función para generar colores aleatorios
const generateRandomColor = (opacity: number) => {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }
  
  // Función para generar una paleta de colores
  const generateColorPalette = (numColors: number) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      colors.push(generateRandomColor(0.3))
    }
    return colors
  }

const Estadisticas = () => {

    const { url } = apisPeticion();
    const [chartData, setChartData] = useState<any>({})
    const [dateStart, setDateStart] = useState<string>('')
    const [dateEnd, setDateEnd] = useState<string>('')
    const [originalData, setOriginalData] = useState<any>([])
  
    useEffect(() => {
      axios
        .get(`${url}/product`, getConfig())
        .then((res) => {
          setOriginalData(res.data.data)
          processChartData(res.data.data)
        })
        .catch((err) => console.log(err));
    }, []);
  
    const processChartData = (data: any) => {
      const numDataPoints = data.length
      const backgroundColors = generateColorPalette(numDataPoints)
      const borderColors = backgroundColors.map((color) =>
        color.replace("0.3", "1")
      )
  
      const filteredProductos = data.filter((producto: any) => {
        const fechaIngreso = new Date(producto.createdAt)
        return (
          (!dateStart || fechaIngreso >= new Date(dateStart)) &&
          (!dateEnd || fechaIngreso <= new Date(dateEnd))
        )
      });
  
      const productosData: any = {};
  
      filteredProductos.forEach((producto: any) => {
        if (productosData[producto.name]) {
          productosData[producto.name] += parseInt(producto.stock);
        } else {
          productosData[producto.name] = parseInt(producto.stock);
        }
      });
  
      const labels = Object.keys(productosData);
      const dataf = Object.values(productosData);
  
      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Productos",
            data: dataf,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      };
  
      setChartData(chartData)
    }
  
    const handleSearchClick = () => {
      processChartData(originalData);
    };

  return (
    <div className="Estadisticas">
      <div className="estadisticas-container">
        <div className="dates-container">
          <h1>Fecha de inicio</h1>
          <input
            onChange={(e: any) => setDateStart(e.target.value)}
            type="date"
          />
          <h1>Fecha fin</h1>
          <input
            onChange={(e: any) => setDateEnd(e.target.value)}
            type="date"
          />
          <button onClick={handleSearchClick}>Buscar</button>
        </div>
        <div className="card">
          <Chart
            type="bar"
            data={chartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Estadisticas