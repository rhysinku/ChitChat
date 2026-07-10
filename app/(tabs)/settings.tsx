import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/stores/authStore";

export default function SettingsScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 bg-background px-6 pt-10">
      <View className="mb-8">
        <Text className="text-xl font-bold text-primary">
          {user?.username}
        </Text>
        <Text className="text-secondary">{user?.email}</Text>
      </View>
      <Button title="Sign Out" variant="outline" onPress={handleLogout} />
    </View>
  );
}
