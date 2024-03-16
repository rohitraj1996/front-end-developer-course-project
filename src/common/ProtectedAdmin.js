import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const ProtectedAdmin = ({children}) => {

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.token || !user?.roles?.includes("ADMIN")) {
            navigate("/signin");
        }
    }, []);

    return children
};

export default ProtectedAdmin;
