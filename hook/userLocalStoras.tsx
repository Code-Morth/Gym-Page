
  
  function userLocalStoras() {
    
    const agregarLocal = (clave: string, datos: any) => {
  
  
      localStorage.setItem(clave, JSON.stringify(datos));
    };
  
  
    const obtenerLocal = (clave: string) => {
      try {
        const item = localStorage.getItem(clave);
  
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.log(error);
      }
    };
  
    const eliminarLocal = (clave: string) => {
      localStorage.removeItem(clave);
    };
  
    return { agregarLocal, obtenerLocal, eliminarLocal };
  }
  
  export default userLocalStoras;