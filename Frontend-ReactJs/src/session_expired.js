import { useNavigate} from "react-router-dom";
import { useEffect,useRef } from "react";

export function Session_Expired({ error }){

const navigate = useNavigate();
const hasAlerted = useRef(false);

const redirect = () => {
    if (error && error.response && error.response.status === 403) {
        if (!hasAlerted.current) {
        alert("Session expired. Please log in again.");
        hasAlerted.current = true;  
    }
        localStorage.removeItem("jwtToken");
        navigate("/owner/login");
    }
};

// React.useEffect(() => {
//     redirect();
// }, [error]);

useEffect(() => {
    if (error) {
        redirect(); 
    }
}, [error]);  

return null;

}