import { View } from 'react-native';

import { Badge } from './primitives/Badge';
import { Card } from './primitives/Card';
import { Row } from './primitives/Row';
import { Text } from './primitives/Text';

import { AppIcon } from './AppIcon';
import { StyledCheckbox } from './StyledCheckbox';
import type { InstalledApp } from '../types/InstalledApp';

interface InstalledAppListItemProps {
  app: InstalledApp;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onSelect?: (app: InstalledApp) => void;
}

export function InstalledAppListItem({ app, checked, onChange, onSelect }: InstalledAppListItemProps) {
  return (
    <Card onPress={onSelect !== undefined ? () => onSelect(app) : undefined}>
      <Row gap="md" align="center">
        <Row gap="md">
          <AppIcon packageName={app.packageName} />
          <View className="flex-1">
            <Text weight="medium">{app.label}</Text>
          </View>
          {app.isSocial && <Badge label="Social" variant="success" />}
          <StyledCheckbox checked={checked} onChange={onChange} />
        </Row>
      </Row>
    </Card>
  );
}