export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}
export type CreateUserDTO = Omit<User, 'id'>;
