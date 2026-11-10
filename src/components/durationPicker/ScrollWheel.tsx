import React, { useEffect, useRef } from 'react';
import { ScrollView, Text as RNText, View } from 'react-native';

const ITEM_HEIGHT = 30;
const VISIBLE_ITEMS = 2.1;
export const WHEEL_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

interface ScrollWheelProps {
  /** Currently selected value. */
  value: number;
  /** Inclusive maximum value (0..max). */
  max: number;
  /** Called with the new value after scrolling settles. */
  onChange: (value: number) => void;
  /** Optional column label shown above the wheel. */
  label?: string;
}

/**
 * A single scrollable column of numbers, used by `ScrollableTimePicker`.
 */
export function ScrollWheel({ value, max, onChange, label }: ScrollWheelProps) {
  const scrollRef = useRef<React.ElementRef<typeof ScrollView>>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: value * ITEM_HEIGHT, animated: true });
  }, [value]);

  const items = Array.from({ length: max + 1 }, (_, index) => index);

  return (
    <View className="items-center">
      {label !== undefined && (
        <RNText className="text-xs text-gray-500 mb-1">{label}</RNText>
      )}
      <View
        className="overflow-hidden rounded-lg border border-gray-200 bg-white"
        style={{ height: WHEEL_HEIGHT, width: 48 }}
      >
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          onMomentumScrollEnd={(event) => {
            const offsetY = event.nativeEvent.contentOffset.y;
            const index = Math.round(offsetY / ITEM_HEIGHT);
            const clamped = Math.max(0, Math.min(max, index));
            onChange(clamped);
          }}
          contentContainerStyle={{
            paddingVertical: (ITEM_HEIGHT * (VISIBLE_ITEMS - 1)) / 2,
          }}
        >
          {items.map((item) => (
            <View
              key={item}
              className="items-center justify-center"
              style={{ height: ITEM_HEIGHT }}
            >
              <RNText
                className={
                  item === value
                    ? 'text-lg font-bold text-blue-600'
                    : 'text-lg text-gray-700'
                }
              >
                {item.toString().padStart(2, '0')}
              </RNText>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}