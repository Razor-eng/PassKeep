export interface User {
  email: string;
  username: string;
  password: string;
}

export interface PasswordEntry {
  id: string;
  name: string;
  password: string;
  note?: string;
  createdAt: string;
  userId: string;
}

export interface ThemeOption {
  value: string;
  label: string;
  colors: {
    background: string;
    foreground: string;
  };
}