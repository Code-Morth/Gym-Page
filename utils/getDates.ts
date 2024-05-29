export const getMonthsBetweenDates = (dateStart: any, dateEnd: any) => {
    // Convertir las fechas de entrada a objetos de tipo Date
    const startDate = new Date(dateStart)
    const endDate = new Date(dateEnd)

    // Array para almacenar los meses
    const months: any = []

    // Asegurarse de que la fecha de inicio es menor o igual que la fecha de fin
    if (startDate > endDate) {
      return months
    }

    // Array con los nombres de los meses en español
    const monthNames = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ]

    // Iterar sobre los meses entre las dos fechas
    let currentDate = new Date(startDate)
    currentDate.setDate(1) // Establecer el día del mes en 1

    while (currentDate <= endDate) {
      // Obtener el nombre del mes
      const monthName = monthNames[currentDate.getMonth()]
      months.push(monthName)

      // Pasar al siguiente mes
      currentDate.setMonth(currentDate.getMonth() + 1)
    }

    return months
  }

  export const getUsersCreatedByMonth = (data:any) =>{

    const monthNames = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
    // Objeto para almacenar el conteo de usuarios por mes
    const usersByMonth:any = {};

    // Iterar sobre los usuarios
    data?.data?.forEach((user:any) => {
        const date = new Date(user?.createdAt);
        const month = date.getMonth(); // Obtener el mes (0-11)
        const monthName:any = monthNames[month]; // Obtener el nombre del mes

        // Incrementar el conteo de usuarios para el mes
        if (usersByMonth[monthName]) {
            usersByMonth[monthName]++;
        } else {
            usersByMonth[monthName] = 1;
        }
    });

    // Convertir el objeto a un array de objetos
    const result = Object.keys(usersByMonth).map(month => {
        return { mes: month, usuarios: usersByMonth[month] };
    });

    return result;
}