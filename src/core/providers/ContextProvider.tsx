import { AppContextProvider } from '@/core/store/contexts/app.context';
import { UserContextProvider } from '@/core/store/contexts/user.context';
import { PropsWithChildren } from 'react';
import { JournalContextProvider } from '@/core/store/contexts/journal.context';
import { BottomSheetProvider } from '@/core/store/contexts/bottom-sheet.context';

export const ContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <AppContextProvider>
      <UserContextProvider>
        <JournalContextProvider>
          <BottomSheetProvider>{children}</BottomSheetProvider>
        </JournalContextProvider>
      </UserContextProvider>
    </AppContextProvider>
  );
};
