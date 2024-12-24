import Plate from './Plate';

const Section = ({ title, plates }) => {
  return (
    <div style={{ margin: '20px 0' }}>
      <h2>{title}</h2>
      <div>
        {plates.map((plate, index) => (
          <Plate
            key={index}
            name={plate.name}
            description={plate.description}
            price={plate.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;
