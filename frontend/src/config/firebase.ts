import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Envs } from './envs';

const firebaseConfig = {
  apiKey: `${Envs.get('EXPO_PUBLIC_FIREBASE_API_KEY')}`,
  authDomain: `${Envs.get('EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN')}`,
  projectId: `${Envs.get('EXPO_PUBLIC_FIREBASE_PROJECT_ID')}`,
  storageBucket: `${Envs.get('EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET')}`,
  messagingSenderId: `${Envs.get('EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID')}`,
  appId: `${Envs.get('EXPO_PUBLIC_FIREBASE_APP_ID')}`,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);