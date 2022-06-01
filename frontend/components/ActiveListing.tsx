import React from 'react'
import { ExtendedListing } from '../models/ExtendedListing'
import styles from '../styles/ActiveListing.module.css'
import { XIcon } from '@heroicons/react/solid'

type Props = {
  listing: ExtendedListing | null;
  onClose: Function;
}

export const ActiveListing: React.FC<Props> = ({ listing, onClose }) => {
  return (
    <div className={`${styles.wrapper} ${listing ? '' : styles.hidden}`}>
      {listing && (
        <div>
          <h1 className={styles.heading}>{listing.name}</h1>
          <div className={styles.close} onClick={() => onClose()}>
            <XIcon width={25} height={25} />
          </div>
          <img loading="lazy" src={listing.pictureUrl} alt={listing.name} />
        </div>
      )}
    </div>
  )
}
