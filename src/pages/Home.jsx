import React from "react";
import styles from "./styles/home.module.css";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import ContactCard from "../components/ContactCard";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import defaultData from "../defaultData";
const Home = ({ profiles }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <div className={styles.ControlBox}>
        <div className={styles.search}>
          <HiOutlineMagnifyingGlass size={25} style={{ color: "#9C9C9C" }} />
          <input type="text" placeholder="Enter Name" />
        </div>
        <button className={styles.searchButton}>Search</button>
      </div>
      {defaultData.map((contact, index) => (
        <ContactCard key={index} contact={contact} />
      ))}
      {profiles.length > 0 ? (
        profiles.map((contact, index) => (
          <ContactCard key={index} contact={contact} />
        ))
      ) : ( 
        <p>No New Profile Available Please Add New Profile</p>
      )}
      <div className={styles.AdminAddBtn} onClick={() => navigate("/admin")}>
        <FiPlus />
      </div>
    </div>
  );
};

export default Home;
