import { Tabs } from 'expo-router';
import { Icon, IconName, Role } from '@/design/ui';
import { palette } from '@/design/tokens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RoleTabs({ role }: { role: Role }) {
  const insets = useSafeAreaInsets();
  const tabs: { name: string; title: string; icon: IconName }[] = [
    { name: 'index', title: 'Home', icon: 'home' },
    { name: 'discover', title: role === 'owner' ? 'Search' : 'Jobs', icon: 'search' },
    { name: role === 'owner' ? 'bookings' : 'schedule', title: role === 'owner' ? 'Bookings' : 'Schedule', icon: 'calendar' },
    { name: 'messages', title: 'Messages', icon: 'message' },
    { name: 'profile', title: 'Profile', icon: 'person' },
  ];
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: palette.accent,
      tabBarInactiveTintColor: palette.muted,
      tabBarStyle: {
        backgroundColor: palette.surface, borderTopColor: palette.border,
        height: 68 + insets.bottom, paddingBottom: insets.bottom + 6, paddingTop: 6,
      },
      tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      tabBarItemStyle: { paddingVertical: 0 },
      sceneStyle: { backgroundColor: palette.canvas },
    }}>
      {tabs.map(({ name, title, icon }) => (
        <Tabs.Screen key={name} name={name} options={{
          title, tabBarAccessibilityLabel: title,
          tabBarIcon: ({ color }) => <Icon name={icon} color={color} size={23} />,
        }} />
      ))}
    </Tabs>
  );
}
