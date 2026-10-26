import { Pressable, View } from 'react-native';
import { cva } from 'class-variance-authority';
import { Text, type TextProps } from './Text';

const circle = cva('w-6 h-6 rounded-full items-center justify-center border', {
  variants: {
    selected: {
      true: 'border-blue-600',
      false: 'border-gray-400',
    },
  },
});

interface RadioProps {
  label: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
  className?: string;
  labelTextProps?: Partial<TextProps>;  // Nested Text settings, defaults: size="md"
}

export function Radio({ label, value, selected, onSelect, className, labelTextProps }: RadioProps) {
  const rowClasses = className ? `flex-row items-center gap-1.5 ${className}` : 'flex-row items-center gap-1.5';

  return (
    <Pressable onPress={() => onSelect(value)} className={rowClasses}>
      <View className={circle({ selected })}>
        {selected && <View className="w-3 h-3 rounded-full bg-blue-600" />}
      </View>
      <Text size="md" {...labelTextProps}>{label}</Text>
    </Pressable>
  );
}
