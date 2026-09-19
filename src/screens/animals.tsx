import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Button, Copy, Icon, Photo, Screen, styles } from '@/design/ui';
import { useDemo } from '@/demo/store';

export default function Animals() {
  const { animals } = useDemo();
  return (
    <Screen role="owner" back="/owner" title="Your animals">
      {animals.map(animal => <Pressable key={animal.id} accessibilityRole="button" accessibilityLabel={'Edit ' + animal.name} style={styles.rowLink}
        onPress={() => router.push({ pathname: '/animal/[id]', params: { id: animal.id } })}>
        <Photo uri={animal.photo} label={animal.name} size={72} />
        <View style={styles.flex}><Copy variant="heading">{animal.name}</Copy><Copy muted>{animal.type} · {animal.age}</Copy></View><Icon name="arrow" size={20} />
      </Pressable>)}
      <Button label="Add animal" secondary href={{ pathname: '/animal/[id]', params: { id: 'new' } }} />
    </Screen>
  );
}
