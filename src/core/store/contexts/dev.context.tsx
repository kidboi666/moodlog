import { createContext, PropsWithChildren, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '@/core/constants/storage';
import { dummyJournals } from '../../../../dummy';

export const DevContext = createContext<any>(null);

export const DevContextProvider = ({ children }: PropsWithChildren) => {
  if (!__DEV__) return children;

  const handleClearUserStorage = async () => {
    console.log('Clearing user storage...');
    await AsyncStorage.removeItem(STORAGE_KEY.USER_INFO);
  };

  const handleClearJournalStorage = async () => {
    console.log('Clearing journal storage...');
    await AsyncStorage.removeItem(STORAGE_KEY.JOURNAL_STORE);
  };

  const handleClearStorage = async () => {
    console.log('Clearing storage...');
    await AsyncStorage.clear();
  };

  const insertDummyData = async () => {
    console.log('Inserting dummy data...');
    await AsyncStorage.setItem(
      STORAGE_KEY.JOURNAL_STORE,
      JSON.stringify(dummyJournals),
    );
  };

  const handleClearStatsStorage = async () => {
    console.log('Clearing statistics storage...');
    await AsyncStorage.removeItem(STORAGE_KEY.MOOD_STATS);
    await AsyncStorage.removeItem(STORAGE_KEY.JOURNALS_STATS);
  };

  return (
    <DevContext.Provider
      value={{
        onClearUserStorage: handleClearUserStorage,
        onClearJournalStorage: handleClearJournalStorage,
        onClearStorage: handleClearStorage,
        onClearStatsStorage: handleClearStatsStorage,
        insertDummyData,
      }}
    >
      {children}
    </DevContext.Provider>
  );
};

export const useDev = () => {
  const context = useContext(DevContext);
  if (!context) {
    throw new Error('useDev must be used within a DevContextProvider');
  }
  return context;
};
