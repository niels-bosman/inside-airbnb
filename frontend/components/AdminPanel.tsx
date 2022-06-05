import { useAuth0 } from '@auth0/auth0-react'
import styles from '../styles/Sidebar.module.css'
import React, { useEffect, useState } from 'react'
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
    getAccessTokenSilently
  } = useAuth0()

  const fetchStatistics = async () => {
    const token = await getAccessTokenSilently()

    const { data, status } = (await axios.get(`${API_URL}/listing/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }))

    console.log(data, status)
  }

  useEffect(() => {
    fetchStatistics()
  }, [])

  return (
    <>
      <h2 className={styles.heading}>Admin</h2>
      {
        isAuthenticated
          ? <Statistics listings={listings}/>
          : <button onClick={() => loginWithRedirect()}>Inloggen</button>
      }
    </>
  )
}
