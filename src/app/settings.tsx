import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Button, Copy, Notice, RowLink, Screen, TextLink } from '@/design/ui';
import { useDemo } from '@/demo/store';

export default function Settings() {
  const { role: param } = useLocalSearchParams<{ role?: string }>();
  const role = param === 'sitter' ? 'sitter' : 'owner';
  const demo = useDemo();
  const [reset, setReset] = useState(false);
  return <Screen back={role === 'owner' ? '/owner/profile' : '/sitter/profile'} title="Settings">
    <View>
      <RowLink icon="person" title="Edit profile" href="/account-edit" />
      <RowLink icon="heart" title="Switch role" href={{ pathname: '/choose-role', params: { from: role } }} />
      <RowLink icon="wallet" title="Payment methods" href={{ pathname: '/settings-detail/[section]', params: { section: 'payments' } }} />
      <RowLink icon="message" title="Notification preferences" href={{ pathname: '/settings-detail/[section]', params: { section: 'notifications' } }} />
      <RowLink icon="shield" title="Privacy & security" href={{ pathname: '/settings-detail/[section]', params: { section: 'privacy' } }} />
      <RowLink icon="heart" title="Help & support" href="/support" />
      <RowLink icon="person" title="Terms & policies" href={{ pathname: '/settings-detail/[section]', params: { section: 'terms' } }} />
    </View>
    {reset ? <><Notice>Reset all demo bookings, offers, messages, and preferences?</Notice><Button label="Reset demo" onPress={() => { demo.reset(); setReset(false); }} /><TextLink label="Keep my changes" onPress={() => setReset(false)} /></> : <TextLink label="Reset demo data" onPress={() => setReset(true)} />}
    <TextLink label="Log out of demo" onPress={() => { demo.reset(); if (router.canDismiss()) router.dismissAll(); router.replace('/'); }} />
    <Copy variant="caption" muted>Prototype 1.0 · All activity is simulated.</Copy>
  </Screen>;
}
