import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, useTheme, type Theme } from './ThemeProvider';
import { Button } from '../forms/Button';
import { Stack } from '../layout/Stack';
import { Box } from '../layout/Box';
import { Text } from '../../typography/Text';
import { Card } from '../data-display/Card';
import { Icon } from '../utility/Icon';
import { BiSun, BiMoon, BiDesktop } from 'react-icons/bi';

/**
 * ThemeProvider manages light/dark mode theming for the application.
 * It provides a React context for theme state and persists preferences to localStorage.
 *
 * Features:
 * - Supports 'light', 'dark', or 'system' (auto-detect) themes
 * - Persists user preference to localStorage
 * - Listens to system preference changes when set to 'system'
 * - Sets `data-theme="dark"` on document root for CSS targeting
 */
const meta: Meta<typeof ThemeProvider> = {
  title: 'Theme/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ThemeProvider manages light/dark mode theming. Wrap your app with it and use the `useTheme` hook to access theme state.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

/** Theme button config for DRY rendering */
const THEME_OPTIONS: { value: Theme; icon: typeof BiSun; label: string }[] = [
  { value: 'light', icon: BiSun, label: 'Light' },
  { value: 'dark', icon: BiMoon, label: 'Dark' },
  { value: 'system', icon: BiDesktop, label: 'System' },
];

/** Demo component that shows theme controls */
function ThemeDemo() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <Box
      p="var(--semantic-space-loose)"
      minW="400px"
      borderRadius="var(--semantic-radius-default)"
      bg="var(--semantic-bg-primary)"
      className="transition-colors duration-300"
    >
      <Card variant="elevated">
        <Card.Header>
          <Card.Title>Theme Settings</Card.Title>
          <Card.Description>Choose your preferred color scheme</Card.Description>
        </Card.Header>

        <Card.Content>
          <Stack spacing="md">
            <Stack spacing="xs">
              <Text size="small" color="secondary">
                Current setting:{' '}
                <Text as="span" weight="semibold">
                  {theme}
                </Text>
              </Text>
              <Text size="small" color="secondary">
                Resolved theme:{' '}
                <Text as="span" weight="semibold">
                  {resolvedTheme}
                </Text>
              </Text>
            </Stack>

            <Stack direction="horizontal" spacing="sm">
              {THEME_OPTIONS.map(({ value, icon, label }) => (
                <Button
                  key={value}
                  variant={theme === value ? 'primary' : 'ghost'}
                  size="small"
                  onClick={() => setTheme(value)}
                >
                  <Icon icon={icon} size="sm" />
                  {label}
                </Button>
              ))}
            </Stack>
          </Stack>
        </Card.Content>
      </Card>
    </Box>
  );
}

/** Default theme provider with interactive controls */
export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <ThemeDemo />
    </ThemeProvider>
  ),
};

/** Custom localStorage key for theme persistence */
export const CustomStorageKey: Story = {
  render: () => (
    <ThemeProvider storageKey="my-app-theme">
      <ThemeDemo />
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Uses a custom localStorage key (`my-app-theme`) for theme persistence, useful when multiple apps share the same domain.',
      },
    },
  },
};
