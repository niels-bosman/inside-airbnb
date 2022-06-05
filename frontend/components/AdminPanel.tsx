import { useAuth0 } from '@auth0/auth0-react'
import styles from '../styles/Sidebar.module.css'
import React from 'react'
import { Statistics } from './Statistics'
import { Listing } from '../models/Listing'
import axios from 'axios'

type Props = {
  listings: Listing[],
  API_URL: string,
}

export const AdminPanel: React.FC<Props> = ({ listings, API_URL }) => {
  const {
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently,

    logout
  } = useAuth0()

  const canViewStatistics = async () => {
    const token = await getAccessTokenSilently()

    const { status } = await axios.get(`${API_URL}/listing/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    return status === 200
  }

  return (
    <>
      <h2 className={styles.heading}>Admin</h2>
      {
        isAuthenticated && canViewStatistics()
          ? (
            <>
              <button
                className={styles.loginButton}
                onClick={() => logout()}
              >
                Uitloggen
              </button>
              <Statistics listings={listings}/>
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
