import { Pressable, View } from 'react-native';

import { Text } from './primitives/Text';

interface StyledCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function StyledCheckbox({ checked, onChange }: StyledCheckboxProps) {
  return (
    <Pressable onPress={() => onChange(!checked)}>
      <View
        className={`w-6 h-6 items-center justify-center rounded-md border ${
          checked ? 'bg-blue-600 border-blue-600' : 'border-gray-400'
        }`}
      >
        {checked && <Text size="sm" color="text-white">✓</Text>}
      </View>
    </Pressable>
  );
}
