import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Button, Chips, Copy, Field, Notice, Screen, TextLink } from '@/design/ui';
import { useDemo } from '@/demo/store';
import { AnimalType } from '@/demo/model';
import { photos } from '@/demo/data';

export default function AnimalEdit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const demo = useDemo();
  const current = demo.animals.find(a => a.id === id);
  const [name, setName] = useState(current?.name ?? '');
  const [type, setType] = useState<AnimalType>(current?.type ?? 'Dog');
  const [age, setAge] = useState(current?.age ?? '');
  const [notes, setNotes] = useState(current?.notes ?? '');
  const [error, setError] = useState('');
  const [removing, setRemoving] = useState(false);
  function save() {
    if (!name.trim() || !age.trim()) { setError('Add a name and age.'); return; }
    const animal = { id: current?.id ?? 'animal-' + Date.now(), name: name.trim(), type, age, notes, photo: type === 'Dog' ? photos.dog : type === 'Cat' ? photos.cat : current?.type === 'Other' ? current.photo : '' };
    demo.setAnimals(values => current ? values.map(a => a.id === id ? animal : a) : [...values, animal]);
    router.back();
  }
  if (!current && id !== 'new') return <Screen back="/owner/animals" title="Animal not found" />;
  return <Screen back="/owner/animals" title={current ? 'Edit animal' : 'Add animal'}>
    <Field label="Name" value={name} onChangeText={setName} />
    <Copy variant="label">Animal type</Copy><Chips values={['Dog', 'Cat', 'Other'] as const} selected={type} onChange={setType} />
    <Field label="Age" placeholder="e.g. 4 years" value={age} onChangeText={setAge} />
    <Field label="Care notes" hint={type === 'Other' ? 'Include the species and routine.' : undefined} multiline value={notes} onChangeText={setNotes} />
    {error ? <Notice>{error}</Notice> : null}
    <Button label="Save animal" onPress={save} />
    {current && (removing ? <><Notice>Remove {current.name} from your demo animals? Existing booking records stay unchanged.</Notice><Button label="Confirm removal" secondary onPress={() => { demo.setAnimals(values => values.filter(a => a.id !== id)); router.back(); }} /><TextLink label="Keep animal" onPress={() => setRemoving(false)} /></> : <TextLink label="Remove animal" onPress={() => setRemoving(true)} />)}
  </Screen>;
}
