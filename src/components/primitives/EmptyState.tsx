import { View } from 'react-native';
import { Text, type TextProps } from './Text';

const base = 'items-center justify-center gap-1.5';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  titleTextProps?: Partial<TextProps>;        // Nested Text settings, defaults: size="lg", weight="bold", align="center"
  descriptionTextProps?: Partial<TextProps>;  // Nested Text settings, defaults: align="center"
}

export function EmptyState({ title, description, action, className, titleTextProps, descriptionTextProps }: EmptyStateProps) {
  const fullClassName = className ? `${base} ${className}` : base;

  return (
    <View className={fullClassName}>
      <Text size="lg" weight="bold" align="center" {...titleTextProps}>{title}</Text>
      {description !== undefined && <Text align="center" {...descriptionTextProps}>{description}</Text>}
      {action !== undefined && <View>{action}</View>}
    </View>
  );
}
