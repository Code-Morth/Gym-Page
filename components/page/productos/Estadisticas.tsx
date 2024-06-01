import apisPeticion from '@/api/apisPeticion';
import axios from 'axios';
import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';
import getConfig from '../../../utils/getConfig';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from '../../pdf/PdfDocument'; // Asegúrate de que esta ruta sea correcta

// Función para generar colores aleatorios
const generateRandomColor = (opacity: number) => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Función para generar una paleta de colores
const generateColorPalette = (numColors: number) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        colors.push(generateRandomColor(0.3));
    }
    return colors;
};

const Estadisticas = () => {
    const { url } = apisPeticion();
    const [chartData, setChartData] = useState<any>({
        labels: [],
        datasets: [],
    });
    const [dateStart, setDateStart] = useState<string>('');
    const [dateEnd, setDateEnd] = useState<string>('');
    const [originalData, setOriginalData] = useState<any>([]);

    useEffect(() => {
        axios
            .get(`${url}/product?page=0&size=9999999999999`, getConfig())
            .then((res) => {
                setOriginalData(res.data.data);
                processChartData(res.data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const processChartData = (data: any) => {
        const numDataPoints = data.length;
        const backgroundColors = generateColorPalette(numDataPoints);
        const borderColors = backgroundColors.map((color) =>
            color.replace("0.3", "1")
        );

        const filteredProductos = data.filter((producto: any) => {
            const fechaIngreso = new Date(producto.createdAt);
            return (
                (!dateStart || fechaIngreso >= new Date(dateStart)) &&
                (!dateEnd || fechaIngreso <= new Date(dateEnd))
            );
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

        setChartData(chartData);
    };

    const handleSearchClick = () => {
        processChartData(originalData);
    };

    return (
        <div className="Estadisticas main-page">
            <div className="estadisticas-container">
                <div className="dates-container">
                    <h1>Fecha de inicio</h1>
                    <input
                        onChange={(e) => setDateStart(e.target.value)}
                        type="date"
                    />
                    <h1>Fecha fin</h1>
                    <input
                        onChange={(e) => setDateEnd(e.target.value)}
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
                <div className="pdf-download-link">
                    <PDFDownloadLink
                        document={<PdfDocument chartData={chartData} dateStart={dateStart} dateEnd={dateEnd} />}
                        fileName="chart_data.pdf"
                    >
                        {({ loading }) =>
                            loading ? 'Cargando documento...' : 'Descargar PDF'
                        }
                    </PDFDownloadLink>
                </div>
            </div>
        </div>
    );
};

export default Estadisticas;
