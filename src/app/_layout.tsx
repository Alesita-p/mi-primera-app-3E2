import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#121824" }, // Ajustado a un tono oscuro acorde al diseño de la calculadora del video
      }}
    />
  );
}
