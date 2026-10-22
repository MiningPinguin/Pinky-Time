import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { Badge } from './primitives/Badge';
import { Card } from './primitives/Card';
import { EmptyState } from './primitives/EmptyState';
import { Row } from './primitives/Row';
import { Spinner } from './primitives/Spinner';
import { Text } from './primitives/Text';

import { AppIcon } from './AppIcon';
import { getInstalledApps } from '../services/installedAppsService';
import type { InstalledApp } from '../types/InstalledApp';

interface InstalledAppsListProps {
  onSelect?: (app: InstalledApp) => void;
}

export function InstalledAppsList({ onSelect }: InstalledAppsListProps) {
  const [apps, setApps] = useState<InstalledApp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getInstalledApps()
      .then((result) => {
        if (isMounted) {
          setApps(result);
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
      contentContainerClassName="p-4 gap-3"
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
          </Row>
        </Card>
      )}
    />
  );
}

