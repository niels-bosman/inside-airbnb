import { useAuth0 } from '@auth0/auth0-react'
import styles from '../styles/Sidebar.module.css'
import React from 'react'

export const AdminPanel = () => {
  // TODO: Fix whole admin thing.

  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    loginWithRedirect
  } = useAuth0()

  return (
    <>
      <h2 className={styles.heading}>Admin</h2>
      {
        isAuthenticated
          ? <p>Welkom</p>
          : <button onClick={() => loginWithRedirect()}>Inloggen</button>
      }
    </>
  )
}
