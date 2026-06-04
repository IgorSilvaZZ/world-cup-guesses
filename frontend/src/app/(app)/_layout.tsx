import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AppLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true, title: 'Meu App' }} >
      <Tabs.Screen name="index" options={{ 
        title: 'Partidas', 
        tabBarIcon: ({ focused, color }) => (
          <Ionicons name={focused ? 'football' : 'football-outline'} size={24} color={color} />
        )
      }} />
      <Tabs.Screen name="ranking" options={{ title: 'Ranking', tabBarIcon: ({ focused, color }) => (
        <Ionicons name={focused ? 'trophy' : 'trophy-outline'} size={24} color={color} />
      ) }} />
    </Tabs>
  );
}