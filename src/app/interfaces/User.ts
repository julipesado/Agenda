export interface User{
    
  id: number
  firstName: string,
  lastName: string,
  userName: string,
  password: string,
}
export type NewUser = Omit<User,"id">;