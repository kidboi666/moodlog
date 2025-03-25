import { AppContextProvider } from '@/core/store/contexts/app.context';
import { UserContextProvider } from '@/core/store/contexts/user.context';
import { DevContextProvider } from '@/core/store/contexts/dev.context';
import { PropsWithChildren } from 'react';
import { JournalContextProvider } from '@/core/store/contexts/journal.context';

export const ContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <AppContextProvider>
      <UserContextProvider>
        <JournalContextProvider>
          <DevContextProvider>{children}</DevContextProvider>
        </JournalContextProvider>
      </UserContextProvider>
    </AppContextProvider>
  );
};
