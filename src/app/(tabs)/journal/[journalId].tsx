import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { JournalScreen } from '@/features/journal/screens/Journal.screen';
import { toSingle } from '@/core/utils/common';

export default function Screen() {
  const { journalId } = useLocalSearchParams();

  return <JournalScreen journalId={toSingle(journalId)} />;
}
