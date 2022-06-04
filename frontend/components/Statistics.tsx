import React from 'react'
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
import { Listing } from '../models/Listing'
import {
  getAveragePricePerNeighbourhood,
  getAverageRatingPerNeighbourhood,
  getListingsPerNeighbourhood
} from '../data/statistics'

type Props = {
  listings: Listing[],
}

export const Statistics: React.FC<Props> = ({ listings }) => {
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

  return (
    <>
      <h5>Aantal listings per buurt</h5>
      <Pie data={getListingsPerNeighbourhood(listings)}/>
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
        data={getAveragePricePerNeighbourhood(listings)}
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
        data={getAverageRatingPerNeighbourhood(listings)}
      />
    </>
  )
}
