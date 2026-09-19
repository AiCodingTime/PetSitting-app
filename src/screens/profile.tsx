import { router } from 'expo-router';
import { View } from 'react-native';
import { Badge, Copy, Photo, Role, RowLink, Screen, styles } from '@/design/ui';
import { photos } from '@/demo/data';
import { useDemo } from '@/demo/store';

export default function Profile({ role }: { role: Role }) {
  const demo = useDemo();
  const owner = role === 'owner';
  return (
    <Screen role={role} title="Profile">
      <View style={styles.row}><Photo uri={photos.alex} label={demo.profile.name} size={84} /><View style={styles.flex}><Copy variant="heading">{demo.profile.name}</Copy><Copy muted>Denver area</Copy><Badge>{owner ? 'Owner' : 'Sitter'} mode</Badge></View></View>
      <Copy muted>{demo.profile.bio}</Copy>
      <View>
        <RowLink icon="person" title="Edit profile" href="/account-edit" />
        <RowLink icon={owner ? 'paw' : 'calendar'} title={owner ? 'My animals' : 'My schedule'} href={owner ? '/owner/animals' : '/sitter/schedule'} />
        <RowLink icon="calendar" title="My bookings" href={owner ? '/owner/bookings' : '/sitter/bookings'} />
        <RowLink icon="heart" title="Switch role" href={{ pathname: '/choose-role', params: { from: role } }} />
        <RowLink icon="settings" title="Settings" href={{ pathname: '/settings', params: { role } }} />
        <RowLink icon="shield" title="Help & support" href="/support" />
        <RowLink icon="back" title="Log out of demo" onPress={() => { demo.reset(); if (router.canDismiss()) router.dismissAll(); router.replace('/'); }} />
      </View>
      <Copy variant="caption" muted>Demo data resets when you reload or log out.</Copy>
    </Screen>
  );
}
