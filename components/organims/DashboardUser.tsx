"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "primereact/chart";
import getConfig from "../../utils/getConfig";
import apisPeticion from "@/api/apisPeticion";

const DashboardUser = () => {
  const { url } = apisPeticion();
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    axios
      .get(`${url}/client?page=0&size=99999999`, getConfig())
      .then((res) => {
        const customers = res.data.data;
        const activeUsers = customers.filter((user: any) => user.status === "active");
        const inactiveUsers = customers.filter((user: any) => user.status === "deleted");
        // const pendingDeletedUsers = customers.filter((user: any) => /* condición para usuarios pendientes eliminados */);

        const activeUsersByMonth = groupByMonth(activeUsers);
        const inactiveUsersByMonth = groupByMonth(inactiveUsers);
        // const pendingDeletedUsersByMonth = groupByMonth(pendingDeletedUsers);

        const data = {
          labels: Object.keys(activeUsersByMonth),
          datasets: [
            {
              label: "Usuarios Activos",
              backgroundColor: "rgba(75,192,192,0.9)",
              borderColor: "rgba(75,192,192,1)",
              data: Object.values(activeUsersByMonth),
            },
            {
              label: "Usuarios Inactivos",
              backgroundColor: "rgba(255,99,132,0.9)",
              borderColor: "rgba(255,99,132,1)",
              data: Object.values(inactiveUsersByMonth),
            },
            
          ],
        };
        setChartData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const groupByMonth = (users: any[]) => {
    const grouped: { [key: string]: number } = {};
    users.forEach((user) => {
      const month = new Date(user.createdAt).getMonth(); 
      const monthName = new Intl.DateTimeFormat("es", { month: "long" }).format(new Date(0, month)); 
      grouped[monthName] = (grouped[monthName] || 0) + 1;
    });
    return grouped;
  };

  return (
    <div className="dashboard_statistics main-page">
      <Chart type="bar" data={chartData} options={chartOptions} className="dashboard_statistics" />
    </div>
  );
};

export default DashboardUser;
