import React from "react";
import styles from "./styles/contact.module.css";

const ContactCard = ({ contact }) => {
  const handleViewAddress = () => {
    // Construct Google Maps URL
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;
    // Redirect the user
    window.location.href = mapsUrl;
  };

  return (
    <div className={styles.UserDetails}>
      <div className={styles.userImg}>
        <img src={contact?.photoUrl} alt="SP" />
      </div>
      <div className={styles.details}>
        <h3 className={styles.ProfileName}>{contact.name}</h3>
        <p>{contact.details}</p>
        <div className={styles.address}>
          <h3>Address:</h3>
          <p>{contact.address}</p>
        </div>
        <div className={styles.UserBtns}>
          <button onClick={handleViewAddress}>View Address in Map</button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
