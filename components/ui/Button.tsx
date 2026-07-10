import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "accent" | "outline" | "ghost";
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = "accent",
  disabled = false,
  loading = false,
}: ButtonProps) {
  const baseStyles = "py-3 px-6 rounded-lg items-center justify-center";
  const variantStyles = {
    accent: "bg-accent",
    outline: "border border-accent",
    ghost: "",
  };

  return (
    <TouchableOpacity
      className={`${baseStyles} ${variantStyles[variant]} ${disabled ? "opacity-50" : ""}`}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "accent" ? "#ffffff" : "#ef233c"}
        />
      ) : (
        <Text
          className={`font-semibold text-base ${
            variant === "accent" ? "text-white" : "text-accent"
          }`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
