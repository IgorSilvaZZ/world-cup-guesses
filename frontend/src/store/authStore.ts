import { create } from 'zustand';
import { 
  createUserWithEmailAndPassword, 
  updateCurrentUser,
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/config/firebase';

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
  initAuth: () => void;
  register: (email: string, password: string, userName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  initAuth: () => {
    onAuthStateChanged(auth, (user) => {
      set({ user, loading: false, error: null });
    });
  },

  register: async (email: string, password: string, userName: string) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateCurrentUser(auth, { ...userCredential.user, displayName: userName });
      set({ user: userCredential.user, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('userCredential', userCredential);
      
      set({ user: userCredential.user, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await signOut(auth);
      set({ user: null, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));