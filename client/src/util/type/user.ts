interface User {
  id: number
  name: string
  password: string
  token: string
  createdat: string
  updatedat: string
}

declare namespace User {
  export type Id = User["id"]
  export type Name = User["name"]
  export type Password = User["password"]
  export type Token = User["token"]
  export type Createdat = User["createdat"]
  export type Updatedat = User["updatedat"]
}

export const newUser = ({ id = 0, name = "", password = "", token = "" }): User => {
  const u: User = {
    id: id,
    name: name,
    password: password,
    token: token,
    createdat: "",
    updatedat: "",
  }
  return u
}

export default User
