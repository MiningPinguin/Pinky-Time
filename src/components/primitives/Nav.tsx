import { View } from 'react-native';

interface NavProps {
  children: React.ReactNode;
  className?: string;
}

export function Nav({ children, className }: NavProps) {
  const fullClassName = className ? `flex-row ${className}` : 'flex-row';

  return <View className={fullClassName}>{children}</View>;
}
