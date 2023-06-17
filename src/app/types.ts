export interface User {
  email: string;
  full_names: string;
  password: string;
  confirm_password: string;
}

export type UserCredentials = {
  email: User['email'];
  password: User['password'];
};
