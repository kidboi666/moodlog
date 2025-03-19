import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Journal } from '@/types/entries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '@/core/constants/storage';
import { useToastController } from '@tamagui/toast';
import { Nullable } from '@/types/utils';
import { StorageStore } from '@/types/store';

export const StorageContext = createContext<Nullable<StorageStore>>(null);

export const StorageProvider = ({ children }: PropsWithChildren) => {
  const toast = useToastController();
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const isInitialLoadDone = useRef<boolean>(false);
  const previousJournalsLength = useRef<number>(0);

  const loadJournals = useCallback(async () => {
    if (isInitialLoadDone.current) return;

    try {
      setIsLoading(true);
      const savedJournals = await AsyncStorage.getItem(STORAGE_KEY.JOURNALS);

      if (!savedJournals) {
        const backupJournals = await AsyncStorage.getItem(STORAGE_KEY.BACKUP);
        if (backupJournals) {
          const parsedJournals = JSON.parse(backupJournals);
          setJournals(parsedJournals);
          previousJournalsLength.current = parsedJournals.length;

          toast.show('Restored from backup', {
            message: 'Your data has been restored',
          });
          isInitialLoadDone.current = true;
          return;
        }
      }

      const parsedJournals = JSON.parse(savedJournals || '[]');
      setJournals(parsedJournals);
      previousJournalsLength.current = parsedJournals.length;
      isInitialLoadDone.current = true;
    } catch (error) {
      console.error('Load error:', error);

      toast.show('Error loading journals', {
        message: 'Please try again later',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const saveJournals = useCallback(
    async (journals: Journal[]) => {
      try {
        setIsSaving(true);

        if (!Array.isArray(journals)) return;

        await AsyncStorage.setItem(
          STORAGE_KEY.JOURNALS,
          JSON.stringify(journals),
        );

        if (journals.length > 0) {
          await AsyncStorage.setItem(
            STORAGE_KEY.BACKUP,
            JSON.stringify(journals),
          );
        }

        previousJournalsLength.current = journals.length;
      } catch (error) {
        console.error('Save error:', error);
        previousJournalsLength.current = journals.length;
        if (Math.abs(journals.length - previousJournalsLength.current) > 0) {
          toast.show('Error saving journals', {
            message: 'Please try again',
            type: 'error',
          });
        }
      } finally {
        setIsSaving(false);
      }
    },
    [toast],
  );

  const handleSetJournals = useCallback(
    (newJournals: Journal[] | ((prev: Journal[]) => Journal[])) => {
      setJournals(newJournals);
    },
    [],
  );

  useEffect(() => {
    loadJournals();
  }, [loadJournals]);

  useEffect(() => {
    if (
      isInitialLoadDone.current &&
      journals.length !== previousJournalsLength.current &&
      !isSaving
    ) {
      saveJournals(journals);
    }
  }, [journals, saveJournals, isSaving]);

  return (
    <StorageContext.Provider
      value={useMemo(
        () => ({
          journals,
          setJournals: handleSetJournals,
          isLoading: isLoading || isSaving,
        }),
        [journals, handleSetJournals, isLoading, isSaving],
      )}
    >
      {children}
    </StorageContext.Provider>
  );
};
