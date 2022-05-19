import React, { useState } from "react"
import Slider from "rc-slider"
import 'rc-slider/assets/index.css'
import { Listing } from "../models/Listing"
import styles from "../styles/Sidebar.module.css"

type Props = {
  listings: Listing[],
  onFilter: Function,
}

export const Sidebar: React.FC<Props> = ({ listings, onFilter }) => {
  const [filteredPrice, setFilteredPrice] = useState<number[]>([])

  const prices = {
    min: 0,
    max: 2000,
  }

  const filterPrice = (minimum: number, maximum: number) => {
    const filteredListings = listings.filter((listing) => listing.price >= minimum && listing.price <= maximum)
    onFilter(filteredListings)
  }

  return (
    <>
      <div className={styles.heading}>
        <h2>Filters</h2>
        <p>Je kunt alle Airbnb locaties filteren op prijs, buurt en review</p>
      </div>
      <div className={styles.sidebarItem}>
        <h4>
          Prijs {filteredPrice.length !== 0 && `(€${filteredPrice[0]} - €${filteredPrice[1]})`}
        </h4>
        <Slider
          {...prices}
          range
          defaultValue={[prices.min, prices.max]}
          marks={{[prices.min]: prices.min, [prices.max]: prices.max}}
          step={10}
          onChange={(prices) => {
            filterPrice(prices[0], prices[1])

            if (typeof(prices) !== "number") {
              setFilteredPrice(prices)
            }
          }}
        />
      </div>
    </>
  )
};
