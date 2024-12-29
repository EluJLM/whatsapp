const Plate = ({ id, name, description, price, section }) => {
    return (
      <div key={id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', display: "flex" }}>
        <h3>{name}</h3>
        <p>${price}</p>
        <p>{description}</p>
      </div>
    );
  };
  
  export default Plate;
  