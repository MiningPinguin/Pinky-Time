import { Text as RNText } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';

const text = cva('text-gray-900', {
  variants: {
    size: {
      sm: 'text-xs',    // 12 / 16
      md: 'text-sm',    // 14 / 20
      lg: 'text-base',  // 16 / 24
      xl: 'text-xl',    // 20 / 28
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: { size: 'md', weight: 'normal', align: 'left' },
});

interface TextProps extends VariantProps<typeof text> {
  children: React.ReactNode;
  className?: string;
  numberOfLines?: number;
}

export function Text({ children, size, weight, align, className, numberOfLines }: TextProps) {
  return (
    <RNText className={text({ size, weight, align, className })} numberOfLines={numberOfLines}>
      {children}
    </RNText>
  );
}