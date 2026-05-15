import { useContext } from "react";
import { AuthContext } from "../firebase/AuthContext";

const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;
