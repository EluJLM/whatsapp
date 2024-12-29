import { useContext } from "react";
import { MenuContext } from "../../../utilidades/MenuContext";

const PlateEdit = ({value}) => {
    const { updatePlate } = useContext(MenuContext);
    return(
    <div>
        <input
          type="text"
          value={value.name}
          onChange={(e) => updatePlate( value.id, { name: e.target.value }) }
        />
        <input
          type="number"
          value={value.price}
          onChange={(e) => updatePlate( value.id, { price: e.target.value }) }
        />
        <textarea
          type="text"
          value={value.description}
          onChange={(e) =>
            updatePlate( value.id, { description: e.target.value })
          }
        />
      </div>
    )
    
};

export default PlateEdit;