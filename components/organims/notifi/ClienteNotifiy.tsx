import React from 'react'

const ClienteNotifiy = ({ clients , load }:any) => {
  return (
    <div className='box-notification'>
      {clients ? (
        clients.map((client :any) => (
          <div key={client.id} className="notification">
            <p>El cliente <strong>{client.first_name} {client.last_name1}</strong>   </p>
            <p>con CI: <strong>{client.ci}</strong>  tiene su cuenta por renovar. </p>
          </div>
        ))
      ) : (
        <p>No hay notificaciones de renovación.</p>
      )}
    </div>
  )
}

export default ClienteNotifiy
