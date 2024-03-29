import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const ProtectedUser = ({children}) => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.token || (!user?.roles?.includes("USER") && !user?.roles?.includes("ADMIN"))) {
            navigate("/signin");
        }
    }, []);

    return children;
};

export default ProtectedUser;
