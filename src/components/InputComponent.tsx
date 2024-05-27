interface Props {
value: string | number;
name: string;
labelText?:string;
setFunction?:  (newValue: any) => void;
errorMessages?: { [key: string]: string };
type?: string
placeholder?: string
keyDown?:  (newValue: any) => void;

}


const InputComponent = ({value, name, setFunction, errorMessages, labelText, placeholder, keyDown,  type = "text", }:Props) => {


  return ( <div>
                <label htmlFor={name}>{labelText}</label>
        <input
              className="form-input"
              type={type}
              value={value}
              onChange={setFunction}
              name={name}
              onKeyDown={keyDown}
              placeholder={placeholder}
              id={name}
            />
            {errorMessages && errorMessages[name] && (
               <div id={`${name}-error`} className="error-message">
                {errorMessages[name]}
              </div>
            )}
  
  </div> );
}
 
export default InputComponent;