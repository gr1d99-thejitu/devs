export interface Timestamp {
  created_at: Date;
  updated_at: Date;
}

export interface User extends Timestamp {
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

export interface ProgrammingLanguage extends Timestamp {
  readonly id: string;
  name: string;
}
export interface Developer extends Timestamp {
  readonly id: number;
  name: string;
  title: string;
  user_id: string;
}

export interface DeveloperResponse extends Developer {
  user: User;
  programming_languages: ProgrammingLanguage[];
}
