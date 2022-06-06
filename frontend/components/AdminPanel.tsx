import { useAuth0 } from '@auth0/auth0-react'
import styles from '../styles/Sidebar.module.css'
import React from 'react'
import { Statistics } from './Statistics'

export const AdminPanel: React.FC = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout
  } = useAuth0()

  return (
    <>
      <h2 className={styles.heading}>Admin</h2>
      {
        isAuthenticated
          ? (
            <>
              <button
                className={styles.loginButton}
                onClick={() => logout()}
              >
                Uitloggen
              </button>
              <Statistics/>
            </>
          )
          : <button
            className={styles.loginButton}
            onClick={() => loginWithRedirect()}
          >
            Inloggen
          </button>
      }
    </>
  )
}
