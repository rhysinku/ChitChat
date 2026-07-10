import { TextInput, View, Text } from "react-native";

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  placeholder?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address";
}

export default function Input({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  placeholder,
  autoCapitalize = "none",
  keyboardType = "default",
}: InputProps) {
  return (
    <View className="mb-4">
      <Text className="text-sm font-medium text-primary mb-1">{label}</Text>
      <TextInput
        className="border border-secondary rounded-lg px-4 py-3 text-primary bg-white"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor="#8d99ae"
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
      />
    </View>
  );
}
