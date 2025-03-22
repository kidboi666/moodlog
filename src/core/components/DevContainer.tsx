import { Button, H2, ScrollView, YStack } from 'tamagui';
import { useDev } from '@/core/store/contexts/dev.context';

export const DevContainer = () => {
  const {
    onClearUserStorage,
    onClearJournalStorage,
    onClearStorage,
    onClearStatsStorage,
    insertDummyData,
  } = useDev();

  return (
    <ScrollView>
      <H2 mb="$4">Development</H2>
      <YStack gap="$4">
        <Button onPress={onClearUserStorage}>Clear User Storage</Button>
        <Button onPress={onClearJournalStorage}>Clear Journal Storage</Button>
        <Button onPress={onClearStatsStorage}>Clear Stats Storage</Button>
        <Button onPress={onClearStorage}>Clear Storage</Button>
        <Button onPress={insertDummyData}>Insert Dummy Data</Button>
      </YStack>
    </ScrollView>
  );
};
