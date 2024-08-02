import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@/Contexts/Authenticator";
import { Auth } from "@/Config/Config-firebase";
function ProtectedRoute({ children }) {
    let { currentUserDetails } = useAuthenticator();
    let navigate = useNavigate();
    
    if (Auth?.currentUser?.email !== 'javeriakanwal904@gmail.com')
        navigate("/");

    useEffect(() => {
        if (Auth?.currentUser?.email !== 'javeriakanwal904@gmail.com')
            navigate("/");
    }, [navigate]);


    return children;
}

export default ProtectedRoute;
