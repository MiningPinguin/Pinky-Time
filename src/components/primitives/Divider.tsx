import { View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';

const divider = cva('bg-gray-300', {
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'w-px h-full',
    },
    spacing: {
      none: '',
      sm: '',
      md: '',
      lg: '',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', spacing: 'sm', className: 'my-1.5' },
    { orientation: 'horizontal', spacing: 'md', className: 'my-3' },
    { orientation: 'horizontal', spacing: 'lg', className: 'my-6' },
    { orientation: 'vertical', spacing: 'sm', className: 'mx-1.5' },
    { orientation: 'vertical', spacing: 'md', className: 'mx-3' },
    { orientation: 'vertical', spacing: 'lg', className: 'mx-6' },
  ],
  defaultVariants: { orientation: 'horizontal', spacing: 'none' },
});

interface DividerProps extends VariantProps<typeof divider> {
  className?: string;
}

export function Divider({ orientation, spacing, className }: DividerProps) {
  return <View className={divider({ orientation, spacing, className })} />;
}
