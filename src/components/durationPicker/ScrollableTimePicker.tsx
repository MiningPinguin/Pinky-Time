import { View } from 'react-native';
import { Row, Text } from '@/components/primitives';
import { ScrollWheel, WHEEL_HEIGHT } from './ScrollWheel';

interface ScrollableTimePickerProps {
  minutes: number;
  seconds: number;
  onChange: (minutes: number, seconds: number) => void;
}

/**
 * A two-column (minutes / seconds) scrollable digital clock used to set a
 * custom duration.
 */
export function ScrollableTimePicker({
  minutes,
  seconds,
  onChange,
}: ScrollableTimePickerProps) {
  return (
    <Row gap="md" justify="center" align="flex-end">
      <ScrollWheel
        value={minutes}
        max={59}
        label="min"
        onChange={(nextMinutes) => onChange(nextMinutes, seconds)}
      />
      <View className="justify-center" style={{ height: WHEEL_HEIGHT }}>
        <Text size="xl" weight="bold" color="text-white">
          :
        </Text>
      </View>
      <ScrollWheel
        value={seconds}
        max={59}
        label="sec"
        onChange={(nextSeconds) => onChange(minutes, nextSeconds)}
      />
    </Row>
  );
}