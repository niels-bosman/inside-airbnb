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


type Props = {
  MAPBOX_ACCESS_TOKEN: string,
  API_URL: string,
  allListings: Listing[],
}

const Home: React.FC<Props> = ({ MAPBOX_ACCESS_TOKEN, API_URL, allListings }) => {
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
            API_URL={API_URL}
          />
        </section>
        <aside className={styles.sidebar}>
          <Filters
            listings={allListings}
            onFilter={setListings}
          />
          <AdminPanel
            listings={allListings}
            API_URL={API_URL}
          />
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
  const { MAPBOX_ACCESS_TOKEN, API_URL } = process.env

  const allListings: Listing[] = (await axios.get(`${API_URL}/listing`)).data

  return {
    props: {
      MAPBOX_ACCESS_TOKEN,
      API_URL,
      allListings,
    }
  }
}
