import { User, UserType } from '@shop/models/user.model';

export interface AuthUser {
  user_info: User;
  access_token: string;
  refresh_token: string;
}

export interface TokenPayload {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  exp: number;
}
