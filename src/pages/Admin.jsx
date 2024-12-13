import React, { useState } from "react";
import styles from "./styles/admin.module.css";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";
import AddUserForm from "./AddUserForm";

const Admin = ({ addProfile }) => {

  return (
    <div className={styles.main}>
      <div className={styles.Address}>
        <AddUserForm addProfile={addProfile}/>
      </div>
    </div>
  );
};

export default Admin;
