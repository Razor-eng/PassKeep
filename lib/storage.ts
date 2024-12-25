import { toast } from 'sonner';
import { encrypt, decrypt, hashPassword } from './crypto';
import type { User } from './types';

const STORAGE_KEY = 'password_manager_data';
const USERS_KEY = 'password_manager_users';

export function saveUser(user: User): void {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  users.push({
    ...user,
    password: hashPassword(user.password)
  });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getUser(email: string): User | null {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  return users.find((u: User) => u.email === email) || null;
}

export function validatePassword(password: string, hashedPassword: string): boolean {
  return hashPassword(password) === hashedPassword;
}

export function savePassword(passwordEntry: any): void {
  const passwords = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  passwords.push({
    ...passwordEntry,
    password: encrypt(passwordEntry.password)
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(passwords));
  toast.success('Password saved');
}

export function getPasswords(userId: string): any[] {
  const passwords = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return passwords
    .filter((p: any) => p.userId === userId)
    .map((p: any) => ({
      ...p,
      password: '••••••••'
    }));
}

export function getPassword(id: string): any[] {
  const passwords = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return passwords
    .filter((p: any) => p.id === id)
    .map((p: any) => ({
      ...p,
      password: decrypt(p.password)
    }))[0]?.password;
}

export function getName(id: string): any[] {
  const passwords = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return passwords
    .filter((p: any) => p.id === id)
    .map((p: any) => ({
      ...p
    }))[0]?.name;
}

export function deletePassword(id: string): void {
  const passwords = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const updatedPasswords = passwords.filter((p: any) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPasswords));
  toast.success('Password deleted');
}

export function editPassword(passwordEntry: any): void {
  const passwords = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const newPasswords = passwords.filter((password: any) => {
    return password.id !== passwordEntry.id
  });
  newPasswords.push({
    ...passwordEntry,
    password: encrypt(passwordEntry.password)
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newPasswords));
  toast.success('Password updated');
}