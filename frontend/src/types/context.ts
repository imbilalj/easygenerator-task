import { User } from './user';

export interface AuthContextType {
  user: User | null;
  setUserData: (user: User | null) => void;
  removeUserData: () => void;
  loading: boolean;
}
