import Plate from './Plate';

const Section = ({ title, plates }) => {
  return (
    <div style={{ margin: '20px' }} key={title}>
      <h2>{title}</h2>
      <div>
        {plates.map((plate, index) => (
          <Plate
            key={plate.id+index}
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
