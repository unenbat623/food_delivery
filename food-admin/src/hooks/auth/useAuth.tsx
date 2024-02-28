import { AuthContext } from "@/providers";
import { useContext } from "react";

export const useAuthUser = () => {
  const { user, token, setAuthUserAndToken } = useContext(AuthContext);
  return {
    user,
    token,
    setAuthUserAndToken,
  };
};
