import { View, Pressable } from 'react-native';

const base = 'bg-white rounded-xl shadow-sm';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

export function Card({ children, onPress, className }: CardProps) {
  const fullClassName = className ? `${base} ${className}` : base;

  if (onPress !== undefined) {
    return (
      <Pressable onPress={onPress} className={fullClassName}>
        {children}
      </Pressable>
    );
  }

  return <View className={fullClassName}>{children}</View>;
}
