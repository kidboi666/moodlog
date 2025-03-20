import { DraftContextProvider } from '@/core/store/contexts/draft.context';
import { StatisticsContextProvider } from '@/core/store/contexts/statistics.context';
import { AppContextProvider } from '@/core/store/contexts/app.context';
import { ScrollContextProvider } from '@/core/store/contexts/scroll.context';
import { UserContextProvider } from '@/core/store/contexts/user.context';
import { DevContextProvider } from '@/core/store/contexts/dev.context';
import { PropsWithChildren } from 'react';
import { StorageProvider } from '@/core/store/contexts/storage.context';
import { JournalContextProvider } from '@/core/store/contexts/journal.context';
import { DateContextProvider } from '@/core/store/contexts/date.context';

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
