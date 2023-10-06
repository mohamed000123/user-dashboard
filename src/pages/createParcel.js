// styling
import styles from "../auth/login.module.css";
// react
import { useEffect, useState, useRef } from "react";
// routing
import { NavLink, useNavigate } from "react-router-dom";
function CreateParcel() {
  const [pickup, setPickup] = useState("");
  const [dropOff, setdropOff] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  async function addParcel(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/parcel/create", {
        method: "POST",
        body: JSON.stringify({
          pickupAddress: pickup,
          deliveryAddress: dropOff,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        navigate("/parcels");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className={styles.container}>
        <form className={styles.form}>
          <h3>create new parcel</h3>
          <label>pickup address</label>
          <input
            id="pickup"
            type="text"
            placeholder="pickup address"
            onChange={(e) => {
              setPickup(e.target.value);
            }}
          />
          <label>drop off address</label>
          <input
            id="dropOff"
            type="text"
            placeholder="drop off address"
            onChange={(e) => {
              setdropOff(e.target.value);
            }}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}
          <button id="btn" onClick={addParcel}>
            add parcel
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateParcel;
