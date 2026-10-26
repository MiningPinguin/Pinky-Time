import { View, Pressable } from 'react-native';
import { Text, type TextProps } from './Text';

interface MenuItem {
  label: string;
  onPress: () => void;
}

interface MenuProps {
  items: MenuItem[];
  visible: boolean;
  onClose: () => void;
  className?: string;
  itemTextProps?: Partial<TextProps>;  // Nested Text settings, defaults: size="md"
}

const base = 'absolute bg-white rounded-xl shadow-lg p-1.5';

export function Menu({ items, visible, onClose, className, itemTextProps }: MenuProps) {
  if (!visible) return null;

  const fullClassName = className ? `${base} ${className}` : base;

  return (
    <>
      <Pressable onPress={onClose} className="absolute inset-0" />
      <View className={fullClassName}>
        {items.map((item) => (
          <Pressable
            key={item.label}
            onPress={() => {
              item.onPress();
              onClose();
            }}
            className="flex-row items-center px-3 py-1.5"
          >
            <Text size="md" {...itemTextProps}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}
