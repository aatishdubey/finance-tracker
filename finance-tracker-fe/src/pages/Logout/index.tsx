import { useEffect } from "react";
import { signOut } from "../../utils/firebase";
import { useIsAuthenticated } from "../../state/user";
import { useNavigate } from "react-router-dom";

export function Logout() {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    signOut();
    
  }, []);
  return (
    <h2>Logging Out...</h2>
  );
}

