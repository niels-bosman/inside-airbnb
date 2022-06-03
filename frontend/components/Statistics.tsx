import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Listing } from '../models/Listing'
import { getListingsPerNeighbourhood } from '../data/statistics'

type Props = {
  listings: Listing[],
}

export const Statistics: React.FC<Props> = ({ listings }) => {
  ChartJS.register(ArcElement, Tooltip, Legend)

  return (
    <>
      <h5>Aantal listings per buurt</h5>
      <Pie data={getListingsPerNeighbourhood(listings)}/>
    </>
  )
}
