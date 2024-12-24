import "./record.css";
const RecordDefault = () => {
    
  const whatsapp = "3169525151";
    return(
    <div className="conten">
        <p>Hola por favor ve a este WhatsApp </p>
        <h2><a href={`https://wa.me/57${whatsapp}?text=Hola`}>{whatsapp}</a></h2>
        <p>y selecciona opción 1 para tener un formulario válido.</p>
    </div>
    );
};

export default RecordDefault;