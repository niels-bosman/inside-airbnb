import React from "react";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import { Listing } from "../models/Listing";

type Props = {
  listings: Listing[],
  onFilter: Function,
}

export const Sidebar: React.FC<Props> = ({ listings, onFilter }) => {
  const filterPrice = (minimum: number, maximum: number) => {
    const filteredListings = listings.filter((listing) =>
      listing.price >= minimum && listing.price <= maximum
    )

    onFilter(filteredListings);
  }

  return (
    <Slider
      range
      min={0}
      max={400}
      defaultValue={[0, 400]}
      step={10}
      onChange={(prices) => filterPrice(prices[0], prices[1])}
    />
  )
};
