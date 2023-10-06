export default function BasicCard({ parcel }) {
  return (
    <div className="parcel" key={parcel.id}>
      <p>
        parcel name:
        <span style={{ color: "blue" }}>{parcel.name}</span>
      </p>
      <p>
        pickup location:
        <span style={{ color: "blue" }}>{parcel.pickupAddress}</span>
      </p>
      <p>
        drop off location:
        <span style={{ color: "blue" }}>{parcel.deliveryAddress}</span>
      </p>
      <p>
        parcel status:
        <span style={{ color: "red" }}>{parcel.status}</span>
      </p>
    </div>
  );
}
