import { Pressable } from 'react-native';
import { cva } from 'class-variance-authority';
import { Text, type TextProps } from './Text';

const navItem = cva('flex-row items-center rounded-md px-3 py-1.5', {
  variants: {
    active: {
      true: 'bg-blue-100',
      false: '',
    },
  },
});

interface NavItemProps {
  label: string;
  onPress: () => void;
  active?: boolean;
  icon?: string;
  className?: string;
  labelTextProps?: Partial<TextProps>;  // Nested Text settings, defaults: size="md", weight follows the active state
}

export function NavItem({ label, onPress, active = false, className, labelTextProps }: NavItemProps) {
  const weight = labelTextProps?.weight ?? (active ? 'bold' : 'normal');

  return (
    <Pressable onPress={onPress} className={navItem({ active, className })}>
      <Text size="md" {...labelTextProps} weight={weight}>{label}</Text>
    </Pressable>
  );
}
