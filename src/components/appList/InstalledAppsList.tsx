import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { AppIcon } from './AppIcon';
import {InstalledApp} from "@/types";
import {addSelectedApp, getInstalledApps, getSelectedApps, removeSelectedApp} from "@/services";
import {Badge, Card, Checkbox, EmptyState, Row, Spinner, Text} from "@/components/primitives";


interface InstalledAppsListProps {
  onSelect?: (app: InstalledApp) => void;
}

export function InstalledAppsList({ onSelect }: InstalledAppsListProps) {
  const [apps, setApps] = useState<InstalledApp[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const toggleSelected = (app: InstalledApp) => {
    const isSelected = selected.has(app.packageName);
    setSelected((prev) => {
      const next = new Set(prev);
      if (isSelected) {
        next.delete(app.packageName);
      } else {
        next.add(app.packageName);
      }
      return next;
    });

    if (isSelected) {
      void removeSelectedApp(app.packageName).catch(() => {
        // Roll back the optimistic update if persistence fails.
        setSelected((prev) => new Set(prev).add(app.packageName));
      });
    } else {
      void addSelectedApp(app).catch(() => {
        setSelected((prev) => {
          const next = new Set(prev);
          next.delete(app.packageName);
          return next;
        });
      });
    }
  };

  useEffect(() => {
    let isMounted = true;
    Promise.all([getInstalledApps(), getSelectedApps()])
      .then(([installed, persisted]) => {
        if (!isMounted) return;
        setApps(installed);
        setSelected(new Set(persisted.map((app) => app.packageName)));
      })
      .catch(() => {
        if (isMounted) {
          setApps([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Spinner size="large" />
      </View>
    );
  }

  if (apps.length === 0) {
    return (
      <EmptyState
        title="No apps found"
        description="Installed apps could not be loaded on this device."
      />
    );
  }

  return (
    <FlatList
      className="flex-1"
      contentContainerClassName="p-3 gap-3"
      data={apps}
      keyExtractor={(item) => item.packageName}
      renderItem={({ item }) => (
        <Card onPress={onSelect !== undefined ? () => onSelect(item) : undefined}>
          <Row gap="md" align="center">
            <AppIcon packageName={item.packageName} />
            <View className="flex-1">
              <Text weight="medium">{item.label}</Text>
            </View>
            {item.isSocial && <Badge label="Social" variant="success" />}
            <Checkbox
              label=""
              checked={selected.has(item.packageName)}
              onChange={() => toggleSelected(item)}
            />
          </Row>
        </Card>
      )}
    />
  );
}
