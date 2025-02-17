import { Separator } from 'tamagui';
import { useJournal } from '@/store/hooks/useJournal';
import { FlatList } from 'react-native';
import { JournalCard } from '@/components/JournalCard';
import { Container } from '@/components/Container';
import { WeekDayPicker } from '@/components/WeekDayPicker';
import { EmptyJournal } from '@/components/EmptyJournal';
import React from 'react';

export default function HomeScreen() {
  const { selectedJournals } = useJournal();

  return (
    <Container>
      <FlatList
        data={selectedJournals}
        ListHeaderComponent={WeekDayPicker}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <Separator borderColor="transparent" mb="$4" mx="$2" />
        )}
        renderItem={({ item, index }) => (
          <JournalCard journal={item} index={index} />
        )}
        ListEmptyComponent={EmptyJournal}
      />
    </Container>
  );
}
