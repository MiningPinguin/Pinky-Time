import { Pressable, View } from 'react-native';
import { cva } from 'class-variance-authority';
import { Text, type TextProps } from './Text';

const box = cva('w-6 h-6 items-center justify-center rounded-md border', {
  variants: {
    checked: {
      true: 'bg-blue-600 border-blue-600',
      false: 'border-gray-400',
    },
  },
});

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  labelTextProps?: Partial<TextProps>;  // Nested Text settings, defaults: size="md"
  checkTextProps?: Partial<TextProps>;  // Nested Text settings of the ✓ mark, defaults: size="sm", color="text-white"
}

export function Checkbox({ label, checked, onChange, className, labelTextProps, checkTextProps }: CheckboxProps) {
  const rowClasses = className ? `flex-row items-center gap-1.5 ${className}` : 'flex-row items-center gap-1.5';

  return (
    <Pressable onPress={() => onChange(!checked)} className={rowClasses}>
      <View className={box({ checked })}>
        {checked && <Text size="sm" color="text-white" {...checkTextProps}>✓</Text>}
      </View>
      <Text size="md" {...labelTextProps}>{label}</Text>
    </Pressable>
  );
}
