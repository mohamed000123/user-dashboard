import { useEffect, useState } from "react";
import BasicCard from "../components/card";
function ParcelsList() {
  const userId  = localStorage.getItem("userId")
  const [parcels, setParcels] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `http://localhost:8000/all-parcels/user/${userId}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setParcels(data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);
  return (
    <>
      <div className="container">
        {parcels.map((parcel) => {
          return <BasicCard parcel={parcel} key={parcel.id}></BasicCard>;
        })}
      </div>
    </>
  );
}

export default ParcelsList;
