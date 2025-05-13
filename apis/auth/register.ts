import { useMutation } from "@tanstack/react-query";
import instance from "../instance";
import { LoginResponse } from "@/apis/auth/login";

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface RegisterResponse extends LoginResponse {}

const URL = "/auth/register";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (input: RegisterInput) => {
      const response = await instance.post<RegisterResponse>(URL, input);

      return response.data;
    },
  });
};
