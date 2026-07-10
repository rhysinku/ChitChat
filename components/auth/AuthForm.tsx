import { useState } from "react";
import { View } from "react-native";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (
    email: string,
    password: string,
    username?: string
  ) => Promise<void>;
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit(email, password, mode === "register" ? username : undefined);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="px-6">
      {mode === "register" && (
        <Input
          label="Username"
          value={username}
          onChangeText={setUsername}
          placeholder="your username"
        />
      )}
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="your password"
        secureTextEntry
      />
      <Button
        title={mode === "login" ? "Sign In" : "Create Account"}
        onPress={handleSubmit}
        loading={loading}
        disabled={!email || !password || (mode === "register" && !username)}
      />
    </View>
  );
}
