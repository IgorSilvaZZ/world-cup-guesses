import { create } from 'zustand';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { Envs } from '@/config/envs';

GoogleSignin.configure({
  webClientId: `${Envs.get('WEB_CLIENT_ID')}`, // Pegue no Console do Google Cloud
});

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
  initAuth: () => void;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
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

  register: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
      set({ user: userCredential.user, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  loginWithGoogle: async () => {
    set({ loading: true, error: null });
    try {
      await GoogleSignin.hasPlayServices();
      const signInData = await GoogleSignin.signIn();

      if(!signInData.data) {
        throw new Error('Google Sign-In failed: No data returned');
      }
      
      const googleCredential = GoogleAuthProvider.credential(signInData.data.idToken);
      const userCredential = await signInWithCredential(auth, googleCredential);
      
      set({ user: userCredential.user, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await GoogleSignin.signOut();
      await signOut(auth);
      set({ user: null, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));