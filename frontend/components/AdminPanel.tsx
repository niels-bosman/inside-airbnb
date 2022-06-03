import { useAuth0 } from '@auth0/auth0-react'
import styles from '../styles/Sidebar.module.css'
import React, { useEffect, useState } from 'react'
import { Statistics } from './Statistics'
import { Listing } from '../models/Listing'

type Props = {
  listings: Listing[],
}

export const AdminPanel: React.FC<Props> = ({ listings }) => {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0()

  return (
    <>
      <h2 className={styles.heading}>Admin</h2>
      {
        isAuthenticated
          ? <Statistics listings={listings} />
          : <button onClick={() => loginWithRedirect()}>Inloggen</button>
      }
    </>
  )
}
