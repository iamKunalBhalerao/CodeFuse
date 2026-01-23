export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthState {
  user: UserData | null;
  isAuthenticated: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
  userData: (userData: UserData) => void;
}

export interface UserData {
  id: string;
  fullName: string;
  email: string;
}
