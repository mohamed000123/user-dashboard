import { useEffect, useState, useContext } from "react";
import BasicCard from "../components/card";
import { userContext } from "../App";
function ParcelsList() {
  const { userId } = useContext(userContext);
  const [parcels, setParcels] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `http://localhost:8000/parcel/all-parcels/user/${userId}`,
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
          return <BasicCard parcel={parcel}></BasicCard>;
        })}
      </div>
    </>
  );
}

export default ParcelsList;
