import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../instance";
import { useRouter } from "next/navigation";
import { USER_KEYS } from "@/apis/users/keys";
import { UserResponse } from "@/apis/users/type";
import { useStoreContext } from "@/contexts/store";

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const URL = "/auth/login";

export const useLogin = () => {
  const setUser = useStoreContext((state) => state.auth.setUser);
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const response = await instance.post<LoginResponse>(URL, input);

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [USER_KEYS.userMe()] });

      const user = await queryClient.ensureQueryData<UserResponse>({
        queryKey: [USER_KEYS.userMe()],
      });
      setUser(user);
      switch (user.role) {
        case "ADMIN":
          router.push("/admin");
          break;
        case "USER":
          router.push("/dashboard");
          break;
        default:
          router.push("/");
      }
    },
  });
};
