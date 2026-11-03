import { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/state/useAuthStore';
import { InputField } from '@/components/primitives/InputField';
import { StyledButton } from '@/components/StyledButton';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuthStore();

  const handleLogin = async () => {
    setError('');
    try {
      await login(email, password);
      router.replace('/');
    } catch {
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <View className="flex-1">
      <Stack gap="lg" padding="lg">
        <Text size="xl" weight="bold" align="center">Welcome back</Text>
        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          testID="email-input"
        />
        <InputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          testID="password-input"
          error={error !== '' ? error : undefined}
        />
        <StyledButton
          label="Log in"
          onPress={handleLogin}
          isLoading={isLoading}
          testID="login-button"
        />
      </Stack>
    </View>
  );
}
