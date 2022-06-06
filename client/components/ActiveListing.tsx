import React from 'react'
import { ExtendedListing } from '../models/ExtendedListing'
import styles from '../styles/ActiveListing.module.css'
import { StarIcon, XIcon } from '@heroicons/react/solid'

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
          <div className={styles.row}>
            <div>
              <p className={styles.info}>{listing.numberOfReviews} review(s) <StarIcon width={25} height={25}/> {listing.reviewScoresRating / 10}</p>
              <p className={styles.info}>Buurt: {listing.neighbourhood}</p>
              <p className={styles.info}>Prijs per nacht: {listing.price}</p>
              <p className={styles.info}>{listing.guestsIncluded} guest(s) - {listing.bedrooms} bedroom(s) - {listing.beds} bed(s)</p>

              <article style={{marginTop: 30}}>
                {listing.description}
              </article>
            </div>
            <div>
              <img loading="lazy" src={listing.pictureUrl} alt={listing.name} width={500}/>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
