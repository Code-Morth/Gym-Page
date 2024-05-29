// getConfig.js
export default function getConfig() {
  let token = localStorage.getItem('token');
  if (token) {
    token = token.replace(/^"|"$/g, ''); // Eliminar posibles comillas al inicio y al final
  }
  return {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`
    }
  };
}
