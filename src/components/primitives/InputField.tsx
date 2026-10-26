import { TextInput, View } from 'react-native';
import { cva } from 'class-variance-authority';
import { Text, type TextProps } from './Text';

const input = cva('border rounded-md px-3 py-1.5', {
  variants: {
    invalid: {
      true: 'border-red-500',
      false: 'border-gray-400',
    },
  },
});

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  testID?: string;
  className?: string;
  labelTextProps?: Partial<TextProps>;  // Nested Text settings, defaults: size="sm", weight="medium"
  errorTextProps?: Partial<TextProps>;  // Nested Text settings, defaults: size="sm", color="text-red-500"
}

export function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  testID,
  className,
  labelTextProps,
  errorTextProps,
}: InputFieldProps) {
  return (
    <View className="gap-1.5">
      <Text size="sm" weight="medium" {...labelTextProps}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        className={input({ invalid: error !== undefined, className })}
        testID={testID}
        autoCapitalize="none"
      />
      {error !== undefined && <Text size="sm" color="text-red-500" {...errorTextProps}>{error}</Text>}
    </View>
  );
}
