const Plate = ({ name, description, price, section }) => {
    return (
      <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
        <h3>{name}</h3>
        <p>{description}</p>
        <p><strong>Precio:</strong> ${price}</p>
      </div>
    );
  };
  
  export default Plate;
  