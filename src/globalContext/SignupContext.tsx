import React, { createContext, useState, useContext, ReactNode } from "react";

interface SignupContextType {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  dateOfBirth: string;
  setDateOfBirth: React.Dispatch<React.SetStateAction<string>>;
  gender: boolean | null;
  setGender: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const defaultContext: SignupContextType = {
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  name: "",
  setName: () => {},
  dateOfBirth: "",
  setDateOfBirth: () => {},
  gender: null,
  setGender: () => {},
};

const SignupContext = createContext<SignupContextType>(defaultContext);

interface SignupProviderProps {
  children: ReactNode;
}

export function SignupProvider({ children }: SignupProviderProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [gender, setGender] = useState<boolean | null>(null);

  return (
    <SignupContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        name,
        setName,
        dateOfBirth,
        setDateOfBirth,
        gender,
        setGender,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
}

export function useSignupContext(): SignupContextType {
  return useContext(SignupContext);
}
