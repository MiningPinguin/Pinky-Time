import { View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';

const container = cva('', {
  variants: {
    padding: {
      none: '',
      sm: 'p-1.5',
      md: 'p-3',
      lg: 'p-6',
    },
  },
  defaultVariants: { padding: 'none' },
});

interface ContainerProps extends VariantProps<typeof container> {
  children: React.ReactNode;
  flex?: number;
  className?: string;
}

export function Container({ children, padding, flex, className }: ContainerProps) {
  return (
    <View
      className={container({ padding, className })}
      style={flex !== undefined ? { flex } : undefined}
    >
      {children}
    </View>
  );
}
