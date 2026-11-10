import { Stack } from '@/components/primitives';
import { PresetDurationOptions } from './PresetDurationOptions';
import { ScrollableTimePicker } from './ScrollableTimePicker';

interface DurationPickerProps {
  /** Selected duration in seconds. */
  value: number;
  /** Called when the user picks a preset or scrolls to a new custom time. */
  onChange: (seconds: number) => void;
  /** Preset durations in seconds. Defaults to 5, 15 and 30 minutes. */
  presets?: number[];
}

const DEFAULT_PRESETS = [5 * 60, 15 * 60, 30 * 60];

/**
 * Duration picker composed of preset options and a scrollable digital clock
 * for custom times.
 */
export function DurationPicker({
  value,
  onChange,
  presets = DEFAULT_PRESETS,
}: DurationPickerProps) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;

  return (
    <Stack gap="lg" align="center">
      <PresetDurationOptions value={value} presets={presets} onChange={onChange} />
      <ScrollableTimePicker
        minutes={minutes}
        seconds={seconds}
        onChange={(nextMinutes, nextSeconds) =>
          onChange(nextMinutes * 60 + nextSeconds)
        }
      />
    </Stack>
  );
}