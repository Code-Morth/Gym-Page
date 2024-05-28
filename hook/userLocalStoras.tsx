
  
  function userLocalStoras() {
    
    const agregarLocal = (clave:any, datos:any) => {
      localStorage.setItem(clave, JSON.stringify(datos));
    };
  
    const obtenerLocal = (clave:any) => {
      try {
        const item = localStorage.getItem(clave);
        return item ? item : null;
      } catch (error) {
        return null;
      }
    };
  
    const eliminarLocal = (clave:any) => {
      localStorage.removeItem(clave);
    };
  
    return { agregarLocal, obtenerLocal, eliminarLocal };
  }
  
  
  export default userLocalStoras;