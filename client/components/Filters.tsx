import styles from '../styles/Sidebar.module.css'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import Select from 'react-select'
import React, { useEffect, useState } from 'react'
import { Listing } from '../models/Listing'
import { getUniqueNeighbourhoods } from '../data/statistics'

type Props = {
  listings: Listing[],
  onFilter: Function,
}

export const Filters: React.FC<Props> = ({ listings, onFilter }) => {
  const [filteredPrice, setFilteredPrice] = useState<number[] | undefined>()
  const [filteredNeighbourhood, setFilteredNeighbourhood] = useState<string | undefined>()
  const [filteredReview, setFilteredReview] = useState<number[] | undefined>()

  useEffect(() => filter(), [filteredPrice, filteredNeighbourhood, filteredReview])

  const neighbourhoods = getUniqueNeighbourhoods(listings)

  const filter = (): void => {
    onFilter(
      listings
        .filter((listing) => filterPrice(listing) && filterNeighbourhood(listing) && filterReview(listing))
    )
  }

  const filterPrice = (listing: Listing): boolean => {
    if (filteredPrice === undefined) return true

    const [minimum, maximum] = filteredPrice
    const price = parseFloat(listing.price.replace('$', ''))

    return price >= minimum && price <= maximum
  }

  const filterNeighbourhood = (listing: Listing): boolean => {
    if (filteredNeighbourhood === undefined) return true

    return listing.neighbourhood === filteredNeighbourhood
  }

  const filterReview = (listing: Listing): boolean => {
    if (filteredReview === undefined) return true

    const [minimum, maximum] = filteredReview

    return listing.numberOfReviews >= minimum && listing.numberOfReviews <= maximum
  }

  const prices = {
    min: 0,
    max: 1000,
  }

  const reviews = {
    min: listings.reduce((acc, curr) => acc.numberOfReviews < curr.numberOfReviews ? acc : curr).numberOfReviews,
    max: listings.reduce((acc, curr) => acc.numberOfReviews > curr.numberOfReviews ? acc : curr).numberOfReviews,
  }

  return (
    <>
      <div className={styles.top}>
        <h2 className={styles.heading}>Filters</h2>
      </div>
      <div className={styles.sidebarItem}>
        <h5 className={styles.subHeading}>
          Prijs per nacht {filteredPrice && `(???${filteredPrice[0]} - ???${filteredPrice[1]})`}
        </h5>
        <Slider
          {...prices}
          value={filteredPrice}
          range
          defaultValue={[prices.min, prices.max]}
          marks={{ [prices.min]: prices.min, [prices.max]: prices.max }}
          step={10}
          onChange={(prices) => {
            if (typeof (prices) !== 'number')
              setFilteredPrice(prices)
          }}/>
      </div>
      <div className={styles.sidebarItem}>
        <h5 className={styles.subHeading}>
          Buurt
        </h5>
        <Select
          isClearable
          options={neighbourhoods.map((neighbourhood) => ({
            value: neighbourhood,
            label: neighbourhood
          }))}
          onChange={(event: any) => {
            setFilteredNeighbourhood(event?.value)
          }}/>
      </div>
      <div className={styles.sidebarItem}>
        <h5 className={styles.subHeading}>
          Aantal reviews {filteredReview && `(${filteredReview[0]} - ${filteredReview[1]})`}
        </h5>
        <Slider
          {...reviews}
          value={filteredReview}
          range
          defaultValue={[reviews.min, reviews.max]}
          marks={{ [reviews.min]: reviews.min, [reviews.max]: reviews.max }}
          step={10}
          onChange={(reviews) => {
            if (typeof (reviews) !== 'number')
              setFilteredReview(reviews)
          }}/>
      </div>
    </>
  )
}
