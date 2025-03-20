import { PropsWithChildren } from 'react';
import {
  EntriesDateProvider,
  GlobalDateProvider,
  StatisticDateProvider,
  WeekDateProvider,
} from '@/core/store/contexts/date.context';

export const DateContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <GlobalDateProvider>
      <StatisticDateProvider>
        <EntriesDateProvider>
          <WeekDateProvider>{children}</WeekDateProvider>
        </EntriesDateProvider>
      </StatisticDateProvider>
    </GlobalDateProvider>
  );
};
