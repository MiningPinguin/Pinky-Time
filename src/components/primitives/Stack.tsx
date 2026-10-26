import { View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';

const stack = cva('flex-col', {
  variants: {
    gap: {
      none: '',
      sm: 'gap-1.5',
      md: 'gap-3',
      lg: 'gap-6',
    },
    align: {
      'flex-start': 'items-start',
      center: 'items-center',
      'flex-end': 'items-end',
      stretch: 'items-stretch',
    },
    justify: {
      'flex-start': 'justify-start',
      center: 'justify-center',
      'flex-end': 'justify-end',
      'space-between': 'justify-between',
    },
    padding: {
      none: '',
      sm: 'p-1.5',
      md: 'p-3',
      lg: 'p-6',
    },
  },
  defaultVariants: { gap: 'none', align: 'stretch', justify: 'flex-start', padding: 'none' },
});

interface StackProps extends VariantProps<typeof stack> {
  children: React.ReactNode;
  flex?: number;
  className?: string;
}

export function Stack({ children, gap, align, justify, padding, flex, className }: StackProps) {
  return (
    <View
      className={stack({ gap, align, justify, padding, className })}
      style={flex !== undefined ? { flex } : undefined}
    >
      {children}
    </View>
  );
}
