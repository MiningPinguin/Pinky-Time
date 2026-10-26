import { View, Pressable } from 'react-native';
import { Text, type TextProps } from './Text';

interface TagProps {
  label: string;
  onRemove?: () => void;
  className?: string;
  labelTextProps?: Partial<TextProps>;  // Nested Text settings, defaults: size="sm"
  removeTextProps?: Partial<TextProps>; // Nested Text settings of the × button, defaults: size="sm"
}

const base = 'flex-row items-center rounded-full bg-gray-200 px-3 py-1.5 gap-1.5';

export function Tag({ label, onRemove, className, labelTextProps, removeTextProps }: TagProps) {
  const fullClassName = className ? `${base} ${className}` : base;

  return (
    <View className={fullClassName}>
      <Text size="sm" {...labelTextProps}>{label}</Text>
      {onRemove !== undefined && (
        <Pressable onPress={onRemove} className="px-1.5">
          <Text size="sm" {...removeTextProps}>×</Text>
        </Pressable>
      )}
    </View>
  );
}
