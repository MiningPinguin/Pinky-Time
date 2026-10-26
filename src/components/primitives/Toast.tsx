import { View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { Text, type TextProps } from './Text';

const toast = cva('absolute inset-x-0 bottom-0 px-6 py-3', {
  variants: {
    variant: {
      default: 'bg-gray-800',
      success: 'bg-emerald-600',
      error: 'bg-red-600',
    },
  },
  defaultVariants: { variant: 'default' },
});

interface ToastProps extends VariantProps<typeof toast> {
  message: string;
  visible: boolean;
  className?: string;
  messageTextProps?: Partial<TextProps>;  // Nested Text settings, defaults: size="sm", align="center", color="text-white"
}

export function Toast({ message, variant, visible, className, messageTextProps }: ToastProps) {
  if (!visible) return null;

  return (
    <View className={toast({ variant, className })}>
      <Text size="sm" align="center" color="text-white" {...messageTextProps}>{message}</Text>
    </View>
  );
}
