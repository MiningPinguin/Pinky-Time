import { ActivityIndicator } from 'react-native';

interface SpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  className?: string;
}

export function Spinner({ size = 'small', color, className }: SpinnerProps) {
  return <ActivityIndicator size={size} color={color} className={className} />;
}
