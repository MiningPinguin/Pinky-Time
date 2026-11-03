import { View } from 'react-native';

import { AppIcon } from './AppIcon';
import {Badge, Card, Row, Text} from "@/components/primitives";
import {InstalledApp} from "@/types";
import {StyledCheckbox} from "@/components/StyledCheckbox";

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