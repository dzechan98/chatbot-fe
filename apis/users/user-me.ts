import { useQuery } from "@tanstack/react-query";
import instance from "../instance";
import { USER_KEYS } from "./keys";
import { UserResponse } from "@/apis/users/type";
import { useStoreContext } from "@/contexts/store";

const URL = "/users/me";

export const useUserMe = () => {
  const setUser = useStoreContext((state) => state.auth.setUser);

  return useQuery({
    queryKey: [USER_KEYS.userMe()],
    queryFn: async () => {
      try {
        const response = await instance.get<UserResponse>(URL);

        return response.data;
      } catch (error: any) {
        setUser(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        return Promise.reject(error.response.data);
      }
    },

    retry: false,
  });
};
