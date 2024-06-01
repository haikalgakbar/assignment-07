import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const user = Cookies.get("token");
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}
