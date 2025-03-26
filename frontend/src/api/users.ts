import axios from "axios";
import { RegisterRequest } from "../types/users";

export const registerUser = async (data: RegisterRequest) => {
  await axios.post("/api/users/register", data);
};