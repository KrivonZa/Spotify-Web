export interface checkEmail {
  existed: boolean;
  message: string;
}

export interface signup {
  email: string;
  password: string;
  name: string;
  dateOfBirth: string;
  gender: boolean | null;
}

export interface login {
  email: string;
  password: string;
}
