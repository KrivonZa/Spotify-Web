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

export interface forgetConfirm {
  email: string;
  code: number;
}

export interface resetPassword {
  email: string;
  password: string;
  newPassword: string;
}
