import { ScrollView, View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';

const screen = cva('', {
  variants: {
    padding: {
      none: '',
      sm: 'p-1.5',
      md: 'p-3',
      lg: 'p-6',
    },
  },
  defaultVariants: { padding: 'md' },
});

interface ScreenProps extends VariantProps<typeof screen> {
  children: React.ReactNode;
  scrollable?: boolean;
  className?: string;
}

export function Screen({ children, padding, scrollable = true, className }: ScreenProps) {
  if (!scrollable) {
    const fullClassName = className ? `flex-1 ${screen({ padding })} ${className}` : `flex-1 ${screen({ padding })}`;

    return (
      <View className={fullClassName}>
        {children}
      </View>
    );
  }

  const contentClasses = className
    ? `${screen({ padding })} grow ${className}`
    : `${screen({ padding })} grow`;

  return (
    <ScrollView className="flex-1" contentContainerClassName={contentClasses}>
      {children}
    </ScrollView>
  );
}
