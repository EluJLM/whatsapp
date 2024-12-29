import { useState } from "react";
import PlateEdit from "./PlatesEdit";

const SectionsEdit = ({section}) => {
    const [see, setSee] = useState(false);

    return(
    <div>
        <h3 onClick={() => setSee(!see)}>{section.title}</h3>
        <div style={{ display: see === true ? "block" : "none" }}>
            {section.plates.map((plate) => (
            <PlateEdit 
                key={plate.id}
                value={plate}
            />
            ))}
        </div>
      </div>
    )
};

export default SectionsEdit;