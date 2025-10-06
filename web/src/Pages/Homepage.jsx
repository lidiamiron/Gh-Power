import React from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = ({token}) => {
  let navigate = useNavigate()
  
  function handleLogout(){
    sessionStorage.removeItem('token')
    navigate('/')
  }

  // Función para obtener el nombre del usuario
  const getUserName = () => {
    if (token?.user?.user_metadata?.full_name) {
      return token.user.user_metadata.full_name
    }
    return 'Usuario' // Texto directo en lugar de t('dashboard.user')
  }

  return (
    <div>
      <h3>Bienvenido {getUserName()}</h3> {/* Texto directo en español */}
      <button onClick={handleLogout}>Cerrar Sesión</button> {/* Texto directo en español */}
    </div>
  )
}

export default Homepage