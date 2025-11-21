import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";

const Homepage = ({token}) => {
  let navigate = useNavigate()
  const { t } = useTranslation();
  
  function handleLogout(){
    sessionStorage.removeItem('token')
    navigate('/')
  }

  // Función para obtener el nombre del usuario
  const getUserName = () => {
    if (token?.user?.user_metadata?.full_name) {
      return token.user.user_metadata.full_name
    }
    return t('dashboard.user') // Usar traducción para "Usuario"
  }

  return (
    <div>
      <h3>{t('dashboard.welcome')} {getUserName()}</h3> {/* Texto internacionalizado */}
      <button onClick={handleLogout}>{t('dashboard.logout')}</button> {/* Texto internacionalizado */}
    </div>
  )
}

export default Homepage