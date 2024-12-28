/* eslint-disable react/prop-types */
import { IoMdCart } from "react-icons/io";
<IoMdCart />;

const Button = (props) => {
  return (
    
      <button
        onClick={props.onClick}
        className="p-3 border text-white bg-green-700 font-semibold rounded-md  flex gap-2 items-center"
      >
        {props.icon}
        {props.text}
      </button>
    
  );
};

export default Button;
