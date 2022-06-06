import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ListingsMap from '../components/ListingsMap'
import axios from 'axios'
import { Listing } from '../models/Listing'
import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import { Filters } from '../components/Filters'
import { AdminPanel } from '../components/AdminPanel'
import { ActiveListing } from '../components/ActiveListing'
import { ExtendedListing } from '../models/ExtendedListing'
import { Auth0Provider } from '@auth0/auth0-react'


type Props = {
  MAPBOX_ACCESS_TOKEN: string,
  allListings: Listing[],
}

const Home: React.FC<Props> = ({ MAPBOX_ACCESS_TOKEN, allListings }) => {
  const [listings, setListings] = useState<Listing[]>(allListings)
  const [currentListing, setCurrentListing] = useState<ExtendedListing | null>(null)

  return (
    <div>
      <Head>
        <title>Inside Airbnb: Amsterdam</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <section className={styles.map}>
          <ListingsMap
            listings={listings}
            token={MAPBOX_ACCESS_TOKEN}
            onListingSelect={setCurrentListing}
          />
        </section>
        <aside className={styles.sidebar}>
          <Filters
            listings={allListings}
            onFilter={setListings}
          />
          <Auth0Provider
            domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
            clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
            redirectUri={process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL}
            audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
            cacheLocation="localstorage"
          >
            <AdminPanel/>
          </Auth0Provider>
          <ActiveListing
            onClose={() => setCurrentListing(null)}
            listing={currentListing}
          />
        </aside>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const { MAPBOX_ACCESS_TOKEN, NEXT_PUBLIC_API_URL } = process.env

  const allListings: Listing[] = (await axios.get(`${NEXT_PUBLIC_API_URL}/listing`)).data

  return {
    props: {
      MAPBOX_ACCESS_TOKEN,
      allListings,
    }
  }
}
