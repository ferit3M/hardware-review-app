export interface UserLogin {
  email: string,
  password: string
}

export interface UserRegister {
  name: string,
  email: string,
  password: string
}

export interface Auth {
  access_token: string,
  user: {
    id: number,
    name: string,
    email: string
  }
}
