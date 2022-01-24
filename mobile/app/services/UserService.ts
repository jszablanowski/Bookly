import {
  JwtAuthenticationControllerApi,
  JwtUserControllerApi,
  User,
} from "../api";
import { BASE_URL } from "../apiConfig";

export interface IUserService {
  createUser: (user: User) => Promise<User>;
  login: (userName: string, password: string) => Promise<any>;
}

export class UserService implements IUserService {
  createUser(user: User): Promise<User> {
    let client = new JwtUserControllerApi({ basePath: BASE_URL });

    return client.createUserUsingPOST(user);
  }

  login(userName: string, password: string): Promise<any> {
    let client = new JwtAuthenticationControllerApi({ basePath: BASE_URL });

    return client.createAuthenticationTokenUsingPOST({
      username: userName,
      password: password,
    });
  }
}
