import { View, Image } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { Text, type TextProps } from './Text';

const avatar = cva('rounded-full overflow-hidden items-center justify-center', {
  variants: {
    size: {
      sm: 'w-6 h-6',   // 24
      md: 'w-9 h-9',   // 36
      lg: 'w-12 h-12', // 48
    },
  },
  defaultVariants: { size: 'md' },
});

interface AvatarProps extends VariantProps<typeof avatar> {
  uri?: string;
  name?: string;
  className?: string;
  initialsTextProps?: Partial<TextProps>;  // Nested Text settings, defaults: size="sm"
}

export function Avatar({ uri, name, size, className, initialsTextProps }: AvatarProps) {
  const initials = name
    ? name.split(' ').map((part) => part[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  if (uri !== undefined) {
    return <Image source={{ uri }} className={avatar({ size, className })} />;
  }

  const baseClasses = avatar({ size });
  const fallbackClasses = className ? `${baseClasses} bg-gray-300 ${className}` : `${baseClasses} bg-gray-300`;

  return (
    <View className={fallbackClasses}>
      <Text size="sm" {...initialsTextProps}>{initials}</Text>
    </View>
  );
}
