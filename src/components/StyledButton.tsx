import { Pressable } from 'react-native';
import { Spinner } from './primitives/Spinner';
import { Text } from './primitives/Text';

interface StyledButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  testID?: string;
}

export function StyledButton({
  label,
  onPress,
  variant = 'primary',
  isLoading = false,
  testID,
}: StyledButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      className={`items-center justify-center rounded-md px-3 py-1.5 ${
        variant === 'primary' ? 'bg-blue-600' : 'bg-gray-200'
      } ${isLoading ? 'opacity-50' : ''}`}
      testID={testID}
    >
      {isLoading ? <Spinner size="small" /> : <Text weight="medium">{label}</Text>}
    </Pressable>
  );
}