import { DraftContextProvider } from '@/core/store/contexts/DraftContext';
import { StatisticsContextProvider } from '@/core/store/contexts/StatisticsContext';
import { AppContextProvider } from '@/core/store/contexts/AppContext';
import { ScrollContextProvider } from '@/core/store/contexts/ScrollContext';
import { UserContextProvider } from '@/core/store/contexts/UserContext';
import { DevContextProvider } from '@/core/store/contexts/DevContext';
import { PropsWithChildren } from 'react';
import { DateContextProvider } from '@/core/providers/DateContextProvider';
import { JournalContextProvider } from '@/core/providers/JournalContextProvider';
import { StorageProvider } from '@/core/store/contexts/StorageContext';

export const ContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <StorageProvider>
      <DateContextProvider>
        <JournalContextProvider>
          <DraftContextProvider>
            <StatisticsContextProvider>
              <AppContextProvider>
                <ScrollContextProvider>
                  <UserContextProvider>
                    <DevContextProvider>{children}</DevContextProvider>
                  </UserContextProvider>
                </ScrollContextProvider>
              </AppContextProvider>
            </StatisticsContextProvider>
          </DraftContextProvider>
        </JournalContextProvider>
      </DateContextProvider>
    </StorageProvider>
  );
};
