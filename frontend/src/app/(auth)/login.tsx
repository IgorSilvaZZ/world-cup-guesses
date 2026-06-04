import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ThemedInput } from '@/components/themed-input';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuthStore();

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

      <ThemedInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <ThemedInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <ThemedText style={styles.buttonText}>{loading ? 'Entrando...' : 'Entrar'}</ThemedText>
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
  input: { marginBottom: 12 },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { color: '#007BFF', textAlign: 'center', marginTop: 10 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
});