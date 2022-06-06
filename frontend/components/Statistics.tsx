import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { PriceAveragePerNeighbourhood } from '../models/PriceAveragePerNeighbourhood'
import { ListingAmountPerNeighbourhood } from '../models/ListingAmountPerNeighbourhood'
import { RatingAveragePerNeighbourhood } from '../models/RatingAveragePerNeighbourhood'
import {
  listingAmountToPie,
  priceAverageToBar,
  ratingAverageToBar
} from '../mappers/statistics-mapper'

export const Statistics: React.FC = () => {
  const [statistics, setStatistics] = useState<[
    ListingAmountPerNeighbourhood[],
    PriceAveragePerNeighbourhood[],
    RatingAveragePerNeighbourhood[]
  ]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [hasPermissions, setHasPermissions] = useState<boolean>(true)

  useEffect(() => {
    fetchStatistics()
  }, [])

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
  )

  const { getAccessTokenSilently } = useAuth0()

  const fetch = async (statisticRoute: string, token: string) => {
    const { NEXT_PUBLIC_API_URL } = process.env
    return (await axios.get(`${NEXT_PUBLIC_API_URL}/Statistics/${statisticRoute}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })).data
  }

  const fetchStatistics = async () => {
    const token = await getAccessTokenSilently()

    try {
      const statistics = await Promise.all([
        fetch('listing-amount-per-neighbourhood', token),
        fetch('average-price-per-neighbourhood', token),
        fetch('average-rating-per-neighbourhood', token),
      ])

      setStatistics(statistics)
      setLoading(false)
    } catch {
      setHasPermissions(false)
    }
  }

  if (!hasPermissions) {
    return <p>Je hebt helaas niet genoeg rechten om statistieken in te zien.</p>
  }

  if (loading) return (
    <p>Aan het laden...</p>
  )

  return (
    <>
      <h5>Aantal listings per buurt</h5>
      <Pie data={listingAmountToPie(statistics[0])}/>
      <h5>Gemiddelde prijs per buurt</h5>
      <Bar
        options={{
          scales: {
            x: {
              ticks: {
                display: false
              }
            }
          }
        }}
        data={priceAverageToBar(statistics[1])}
      />
      <h5>Gemiddelde rating per buurt</h5>
      <Bar
        options={{
          scales: {
            x: {
              ticks: {
                display: false
              }
            }
          }
        }}
        data={ratingAverageToBar(statistics[2])}
      />
    </>
  )
}
