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

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface User {
  readonly id: string;
  full_names: string;
  email: string;
}

export interface ProgrammingLanguage {
  readonly id: string;
  name: string;
}
export interface Developer {
  readonly id: number;
  name: string;
  title: string;
  user_id: string;
}

export interface DeveloperResponse extends Developer {
  user: User;
  programming_languages: ProgrammingLanguage[];
}
