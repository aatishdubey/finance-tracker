import { useEffect } from "react";
import { signOut } from "../../utils/firebase";

export function Logout() {
  useEffect(() => {
    signOut();
  }, []);
  return (
    <h2>Logging Out...</h2>
  );
}

