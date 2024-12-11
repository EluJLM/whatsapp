import "./style.css";

const Input = ({value, onChange, name, type, label, placeholder}) => {
    return(
        <div className="inputs-conten">
            <label>
                {label}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
};

export default Input;