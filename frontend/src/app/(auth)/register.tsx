import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuthStore } from "@/store/authStore";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, loginWithGoogle, loading, error } = useAuthStore();
  
    const handleRegister = async () => {
      try {
        await register(email, password);
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
  
        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          <ThemedText style={styles.buttonText}>{loading ? 'Registrando...' : 'Registrar'}</ThemedText>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.googleButton} onPress={loginWithGoogle} disabled={loading}>
          <ThemedText style={styles.googleButtonText}>Entrar com Google</ThemedText>
        </TouchableOpacity>
  
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity>
            <ThemedText style={styles.link}>Já tem uma conta? Faça login</ThemedText>
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