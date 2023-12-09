import { User } from "@shop/models/user.model";

export interface AuthUser {
    user_info: User;
    token: string;
  }