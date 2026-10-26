import { View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';

const row = cva('flex-row', {
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
  },
  defaultVariants: { gap: 'none', align: 'center', justify: 'flex-start' },
});

interface RowProps extends VariantProps<typeof row> {
  children: React.ReactNode;
  wrap?: boolean;
  className?: string;
}

export function Row({ children, gap, align, justify, wrap = false, className }: RowProps) {
  const baseClasses = row({ gap, align, justify, className });
  const fullClassName = wrap ? `${baseClasses} flex-wrap` : baseClasses;

  return <View className={fullClassName}>{children}</View>;
}
