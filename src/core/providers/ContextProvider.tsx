import { AppContextProvider } from '@/core/store/contexts/app.context';
import { UserContextProvider } from '@/core/store/contexts/user.context';
import { DevContextProvider } from '@/core/store/contexts/dev.context';
import { PropsWithChildren } from 'react';
import { JournalContextProvider } from '@/core/store/contexts/journal.context';
import { ThemeContextProvider } from '@/core/store/contexts/theme.context';

export const ContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeContextProvider>
      <AppContextProvider>
        <UserContextProvider>
          <JournalContextProvider>
            <DevContextProvider>{children}</DevContextProvider>
          </JournalContextProvider>
        </UserContextProvider>
      </AppContextProvider>
    </ThemeContextProvider>
  );
};
