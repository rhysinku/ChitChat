import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import AuthForm from "@/components/auth/AuthForm";
import { useAuthStore } from "@/stores/authStore";

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    router.replace("/(tabs)/chats");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background justify-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="mb-10 px-6">
        <Text className="text-3xl font-bold text-primary">ChitChat</Text>
        <Text className="text-secondary text-base mt-2">
          Welcome back. Sign in to continue.
        </Text>
      </View>
      <AuthForm mode="login" onSubmit={handleLogin} />
      <View className="flex-row justify-center mt-6">
        <Text className="text-secondary">Don&apos;t have an account? </Text>
        <Text
          className="text-accent font-semibold"
          onPress={() => router.push("/(auth)/register")}
        >
          Sign Up
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
