import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import AuthForm from "@/components/auth/AuthForm";
import { useAuthStore } from "@/stores/authStore";

export default function RegisterScreen() {
  const router = useRouter();
  const signUp = useAuthStore((s) => s.signUp);

  const handleRegister = async (
    email: string,
    password: string,
    username?: string
  ) => {
    await signUp(email, password, username || "");
    router.replace("/(tabs)/chats");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background justify-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="mb-10 px-6">
        <Text className="text-3xl font-bold text-primary">Create Account</Text>
        <Text className="text-secondary text-base mt-2">
          Sign up to start chatting.
        </Text>
      </View>
      <AuthForm mode="register" onSubmit={handleRegister} />
      <View className="flex-row justify-center mt-6">
        <Text className="text-secondary">Already have an account? </Text>
        <Text
          className="text-accent font-semibold"
          onPress={() => router.push("/(auth)/login")}
        >
          Sign In
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
