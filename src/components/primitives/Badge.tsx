import { View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { Text, type TextProps } from './Text';

const badge = cva('self-start px-3 py-1.5 rounded-full', {
  variants: {
    variant: {
      default: 'bg-gray-200',
      success: 'bg-emerald-100',
      warning: 'bg-amber-100',
      error: 'bg-red-100',
    },
  },
  defaultVariants: { variant: 'default' },
});

interface BadgeProps extends VariantProps<typeof badge> {
  label: string;
  className?: string;
  labelTextProps?: Partial<TextProps>;  // Nested Text settings, defaults: size="sm"
}

export function Badge({ label, variant, className, labelTextProps }: BadgeProps) {
  return (
    <View className={badge({ variant, className })}>
      <Text size="sm" {...labelTextProps}>{label}</Text>
    </View>
  );
}
