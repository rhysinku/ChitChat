import { View, Text } from "react-native";

export default function ChatsScreen() {
  return (
    <View className="flex-1 bg-background justify-center items-center px-6">
      <Text className="text-2xl font-bold text-primary mb-2">
        No conversations yet
      </Text>
      <Text className="text-secondary text-center">
        Start a new chat to begin messaging.
      </Text>
    </View>
  );
}
