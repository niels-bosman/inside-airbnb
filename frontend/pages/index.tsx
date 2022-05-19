import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ListingsMap from '../components/ListingsMap';
import axios from 'axios';
import { Listing } from '../models/Listing';
import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { Sidebar } from "../components/Sidebar";


type Props = {
  MAPBOX_ACCESS_TOKEN: string,
  allListings: Listing[],
}

const Home: React.FC<Props> = ({ MAPBOX_ACCESS_TOKEN, allListings }) => {
  const [listings, setListings] = useState<Listing[]>(allListings)

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
          />
        </section>
        <aside className={styles.sidebar}>
          <Sidebar
            listings={allListings}
            onFilter={setListings}
          />
        </aside>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const { MAPBOX_ACCESS_TOKEN, API_URL } = process.env

  const allListings = (await axios.get(`${API_URL}/listing`)).data

  return {
    props: {
      MAPBOX_ACCESS_TOKEN,
      allListings,
    }
  }
}
