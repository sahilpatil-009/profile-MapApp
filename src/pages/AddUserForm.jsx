import React, { useState } from "react";
import styles from "./styles/addUserForm.module.css";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";

const AddUserForm = ({addProfile}) => {

  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [landmark, setLandmark] = useState("")

  const [loading, setLoading] = useState(false);
  const [uploadPhotoUrl, setUploadPhotoUrl] = useState();

  const navigate = useNavigate();

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setStates(State.getStatesOfCountry(country.isoCode));
    setCities([]);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setCities(City.getCitiesOfState(selectedCountry.isoCode, state.isoCode));
    setSelectedCity(null);
  };

  const handleCityChange = (cityName) => {
    setSelectedCity(cityName);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "profile_map_app");
    data.append("cloud_name", "djmbp2rwt");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/djmbp2rwt/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploadImageUrl = await response.json();
    console.log(uploadImageUrl.url);
    setUploadPhotoUrl(uploadImageUrl.url);
  };

  const handleSubmit = (e) => {
    console.log("clicked")
    e.preventDefault();
    const newProfile = {
      name: e.target.name.value,
      email: e.target.email.value,
      mobile: e.target.mobile.value,
      photoUrl: uploadPhotoUrl,
      details: e.target.details.value,
      address: `${landmark}, ${selectedCity},${selectedState.name},${selectedCountry.name}`,
    };

    addProfile(newProfile);
    console.log("Profile Submitted:", newProfile);
    setLoading(false);
    navigate("/");
  };
  return (
    <form className={styles.formData} onSubmit={handleSubmit}>
      <div className={styles.headtitle}>
        <h1>Add User Details</h1>
      </div>
      <div className={styles.userInput}>
        <label>Name</label>
        <input type="text" placeholder="Enter Person's Name here" name="name" />
      </div>
      <div className={styles.userInput}>
        <label>Email</label>
        <input type="email" placeholder="Enter Email here" name="email" />
      </div>
      <div className={styles.userInput}>
        <label>Mobile</label>
        <input type="text" placeholder="Enter Mobile No" name="mobile" />
      </div>
      <div className={styles.userInput}>
        <label>Profile Photo</label>
        <input type="file" onChange={handleFileUpload} />
      </div>
      <div className={styles.userInput}>
        <label>Details</label>
        <textarea
          rows="4"
          cols="40"
          placeholder="Enter Person's Details"
          name="details"
        />
      </div>
      <div className={styles.userInput}>
        <label>Country</label>
        <select
          onChange={(e) =>
            handleCountryChange(
              countries.find((c) => c.isoCode === e.target.value)
            )
          }
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.userInput}>
        <label>State</label>
        <select
          disabled={!selectedCountry}
          onChange={(e) =>
            handleStateChange(states.find((s) => s.isoCode === e.target.value))
          }
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.userInput}>
        <label>City</label>
        <select
          disabled={!selectedState || !selectedCountry}
          onChange={(e) => handleCityChange(e.target.value)}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.userInput}>
        <label>Street / Landmark</label>
        <input
          type="text"
          placeholder="Enter Street or Landmark"
          onChange={(e) => setLandmark(e.target.value)}
        />
      </div>
      <div className={styles.UserBtns}>
        <button disabled={!loading} type="submit">
          Submit
        </button>
        <button type="button" onClick={() => navigate("/")}>
          Cancle
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;
