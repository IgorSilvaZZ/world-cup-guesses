import { StyleSheet, TextInput } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { ThemeColor } from "@/constants/theme";

export type ThemedInputProps = React.ComponentProps<typeof TextInput> & {
  themeColor?: ThemeColor;
};

export function ThemedInput({ style, themeColor, ...rest }: ThemedInputProps) {
  const theme = useTheme();

  return (
    <TextInput
      style={[
        { color: theme[themeColor ?? 'text'], borderColor: theme[themeColor ?? 'textSecondary'] },
        styles.input,
        style,
      ]}
      placeholderTextColor={theme[themeColor ?? 'textSecondary']}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
  },
});