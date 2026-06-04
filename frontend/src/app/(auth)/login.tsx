import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginWithGoogle, loading, error } = useAuthStore();

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err: any) {
      Alert.alert('Erro', err.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Bem-vindo!</ThemedText>
      {error && <ThemedText style={styles.error}>{error}</ThemedText>}

      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <ThemedText style={styles.buttonText}>{loading ? 'Entrando...' : 'Entrar'}</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={loginWithGoogle} disabled={loading}>
        <ThemedText style={styles.googleButtonText}>Entrar com Google</ThemedText>
      </TouchableOpacity>

      <Link href="/(auth)/register" asChild>
        <TouchableOpacity>
          <ThemedText style={styles.link}>Não tem uma conta? Cadastre-se</ThemedText>
        </TouchableOpacity>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20},
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 12, color: '#fff' },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  googleButton: { backgroundColor: '#DB4437', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  googleButtonText: { color: '#fff', fontWeight: 'bold' },
  link: { color: '#007BFF', textAlign: 'center', marginTop: 10 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
});