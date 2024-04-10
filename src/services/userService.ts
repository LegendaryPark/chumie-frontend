import { saveState } from "../utils/storage";
import baseInstance from "./baseInstance";
import { hashPassword } from "../utils/authUtil";

export const registerUSer = async (userInfo: AuthForm): Promise<any> => {
  try {
    const status = await baseInstance.post(`auth/register`, {
      username: userInfo.username,
      password: hashPassword(userInfo.password),
    });
    return status;
  } catch (error) {
    console.error("Failed to register a user", error);
  }
};

export const loginUser = async (userInfo: AuthForm) => {
  try {
    const data: any = await baseInstance.get("auth/login", {
      params: {
        username: userInfo.username,
        password: hashPassword(userInfo.password),
      },
    });
    console.log(data);
    saveState("access-jwt", data.data.accessToken);
    saveState("refresh-jwt", data.data.refreshToken);
    return data;
  } catch (error) {
    console.error("Failed to log in a user", error);
  }
};
