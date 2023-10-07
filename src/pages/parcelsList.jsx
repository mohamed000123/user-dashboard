import { useEffect, useState } from "react";
import BasicCard from "../components/card";
import BasicSelect from "../components/dropDown";
function ParcelsList() {
  const [parcels, setParcels] = useState([]);
  const [filteredParcels, setFilteredParcels] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    (async function () {
      try {
        const res = await fetch(`http://localhost:8000/all-parcels/user`, {
          credentials: "include",
        });
        const data = await res.json();
        setParcels(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    const result = parcels.filter((parcel) => {
      return parcel.status === selectedValue;
    });
    if (selectedValue !== "") {
      setFilteredParcels(result);
    }
  }, [selectedValue]);
  return (
    <>
      <div className="container">
        <BasicSelect
          handleDropdownChange={handleDropdownChange}
          selectedValue={selectedValue}
        />

        <BasicCard
          parcels={filteredParcels ? filteredParcels : parcels}
        ></BasicCard>
      </div>
    </>
  );
}

export default ParcelsList;
