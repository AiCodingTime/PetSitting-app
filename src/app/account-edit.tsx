import { useState } from 'react';
import { router } from 'expo-router';
import { Button, Field, Notice, Screen } from '@/design/ui';
import { useDemo } from '@/demo/store';

export default function AccountEdit() {
  const demo = useDemo();
  const [name, setName] = useState(demo.profile.name);
  const [bio, setBio] = useState(demo.profile.bio);
  const [error, setError] = useState('');
  return <Screen back="/owner/profile" title="Edit profile">
    <Field label="Full name" value={name} onChangeText={setName} />
    <Field label="About you" value={bio} onChangeText={setBio} multiline maxLength={250} />
    {error ? <Notice>{error}</Notice> : null}
    <Button label="Save profile" onPress={() => { if (!name.trim()) { setError('Add your name.'); return; } demo.setProfile({ name: name.trim(), bio }); router.back(); }} />
  </Screen>;
}
