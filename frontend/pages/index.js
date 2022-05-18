import Head from 'next/head'
import Map from 'react-map-gl';
import styles from '../styles/Home.module.css'
import ListingsMap from '../components/ListingsMap';
import axios from 'axios';



const Home = ({ MAPBOX_TOKEN, listings }) => {
  return (
    <div>
      <Head>
        <title>Inside Airbnb: Amsterdam</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.map}>
          <ListingsMap
            listings={listings}
            token={MAPBOX_TOKEN}
          />
        </section>
        <aside className={styles.sidebar}>
          Sidebar
        </aside>
      </main>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN
  const API_URL = process.env.API_URL

  const listings = (await axios.get(`${API_URL}/listing`)).data

  return {
    props: {
      MAPBOX_TOKEN,
      listings,
    }
  }
}
