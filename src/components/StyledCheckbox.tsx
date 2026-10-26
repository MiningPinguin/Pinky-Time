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
        className={`w-5 h-5 items-center justify-center rounded border ${
          checked ? 'bg-blue-600 border-blue-600' : 'border-gray-400'
        }`}
      >
        {checked && <Text size="sm" color="#FFFFFF">✓</Text>}
      </View>
    </Pressable>
  );
}
