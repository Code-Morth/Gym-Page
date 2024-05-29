export const getMonthsBetweenDates = (dateStart:any, dateEnd:any, dataUsers:any) => {
  // Convertir las fechas de entrada a objetos de tipo Date
  const startDate = new Date(dateStart)
  const endDate = new Date(dateEnd)

  // Array para almacenar los meses y el conteo de usuarios
  const months:any = []
  const userCounts:any = []

  // Asegurarse de que la fecha de inicio es menor o igual que la fecha de fin
  if (startDate > endDate) {
    return { months, userCounts }
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

  // Crear un mapa para contar los usuarios por mes
  const userCountsMap = new Map()

  // Iterar sobre los usuarios y contar cuántos hay por mes
  dataUsers.forEach((user:any) => {
    const date = new Date(user.createdAt)
    const month = date.getMonth() // Obtener el mes (0-11)
    const year = date.getFullYear() // Obtener el año

    // Crear una clave única para cada mes del año
    const key = `${year}-${month}`
    if (!userCountsMap.has(key)) {
      userCountsMap.set(key, 0)
    }
    userCountsMap.set(key, userCountsMap.get(key) + 1)
  })

  // Iterar sobre los meses entre las dos fechas
  let currentDate = new Date(startDate)
  currentDate.setDate(1) // Establecer el día del mes en 1

  while (currentDate <= endDate) {
    // Obtener el nombre del mes
    const monthName = monthNames[currentDate.getMonth()]
    const year = currentDate.getFullYear()
    const key = `${year}-${currentDate.getMonth()}`

    months.push(monthName)
    userCounts.push(userCountsMap.get(key) || 0)

    // Pasar al siguiente mes
    currentDate.setMonth(currentDate.getMonth() + 1)
  }


  return { months, userCounts }
}
