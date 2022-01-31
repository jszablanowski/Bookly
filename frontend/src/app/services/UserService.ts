import {
  JwtAuthenticationControllerApi,
  JwtUserControllerApi,
  User,
  UsersControllerApi,
} from "../api";
import { BASE_URL } from "../apiConfig";

export interface IUserService {
  createUser: (user: User) => Promise<User>;
  login: (userName: string, password: string) => Promise<any>;
  deleteUser: (token: string, userId: number) => Promise<any>;
  editUser: (token: string, userId: number, email: string, firstname: string, lastname: string, password: string) => Promise<any>;
  getUsers: (token: string, page: number, pageSize: number, showOnlyActive: boolean) => Promise<any>
}

export class UserService implements IUserService {
  createUser(user: User): Promise<User> {
    let client = new JwtUserControllerApi({ basePath: BASE_URL });

    return client.createUserUsingPOST(user, true);
  }

  login(userName: string, password: string): Promise<any> {
    let client = new JwtAuthenticationControllerApi({ basePath: BASE_URL });

    return client.createAuthenticationTokenUsingPOST({
      username: userName,
      password: password,
    });
  }

  deleteUser(token: string, userId: number): Promise<any> {
    let client = new UsersControllerApi({
      basePath: BASE_URL,
      apiKey: token,
    });

    return client.disableUserUsingDELETE(userId);
  }

  editUser(
    token: string,
    userId: number,
    email: string,
    firstName: string, 
    lastName: string, 
    password: string
    ): Promise<any> {
    
    let client = new UsersControllerApi({
      basePath: BASE_URL,
      apiKey: token,
    });

    let username = email;
    return client.updateUserUsingPUT(
      {
        email,
        password,
        username,
        firstName, 
        lastName, 
      },
      userId
    );
  }

  getUsers(
    token: string,
    page: number,
    size: number,
    active: boolean
    ): Promise<any> {
    
    let client = new UsersControllerApi({
      basePath: BASE_URL,
      apiKey: token,
    });

    return client.getUsersUsingGET(
      page,
      size,
      active
    );
  }
}
