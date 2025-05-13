import { Gender } from "@/types/gender";

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  photoURL?: string;
  phone?: string;
  gender: Gender;
  dob: string;
  createdAt: string;
  updatedAt: string;
}
