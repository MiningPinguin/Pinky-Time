import { Card, Row, Text } from '@/components/primitives';

interface PresetDurationOptionsProps {
  value: number;
  presets: number[];
  onChange: (seconds: number) => void;
}

/**
 * Three (or more) preset duration options rendered as selectable cards.
 */
export function PresetDurationOptions({
  value,
  presets,
  onChange,
}: PresetDurationOptionsProps) {
  return (
    <Row gap="sm" justify="center" wrap>
      {presets.map((preset) => {
        const isSelected = value === preset;
        const minutes = Math.floor(preset / 60);
        return (
          <Card
            key={preset}
            onPress={() => onChange(preset)}
            className={
              isSelected
                ? 'border-2 border-blue-600 px-4 py-3'
                : 'border border-gray-200 px-4 py-3'
            }
          >
            <Text
              size="md"
              weight={isSelected ? 'bold' : 'normal'}
              align="center"
              color={isSelected ? 'text-blue-600' : undefined}
            >
              {minutes} min
            </Text>
          </Card>
        );
      })}
    </Row>
  );
}