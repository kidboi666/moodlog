import { LoadingState, Nullable, WithState } from '@/types/common.types';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from 'react-native';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { EnhancedTextInputRef } from '@/features/write/components/EnhancedTextInput';
import { DateCounts, ISODateString, ISOMonthString } from '@/types/date.types';
import {
  ExpressiveMonthStats,
  JournalStats,
  MoodStats,
  SelectedMonthStats,
} from '@/types/statistic.types';
import { Draft, Journal } from '@/types/journal.types';
import { NewUserInfo, UserInfo } from '@/types/user.types';
import { Mood } from '@/types/mood.types';
import { Theme, TimeFormat, ViewFontSize } from '@/types/app.types';

export type ContextName = 'week' | 'entries' | 'statistic' | 'global';

export interface JournalStore {
  journals: Journal[];
  dailyJournals: Journal[] | ISODateString;
  selectedJournal: Nullable<Journal>;
  monthlyJournals: Journal[];
  yearlyJournals: Journal[];
  isSubmitted: boolean;
  addJournal: (journal: Draft) => void;
  removeJournal: (id: string) => void;
  getDateCountsForMonth: (year: number, month: number | string) => DateCounts;
  getDateCountsForDate: (
    year: number,
    month: number | string,
    date: number,
  ) => number;
  getMoodForDate: (year: number, month: number, date: number) => Mood[];
  onSelectedJournalChange: (journalId: string) => void;
  updateJournals: (id: string, updateJournal: Journal) => void;
  getJournalsByDate: (date: ISODateString) => void;
  getJournalsByMonth: (date: ISOMonthString) => void;
  getJournalsByYear: (year: number) => void;
}

export interface ThemeStore {
  changeTheme: (theme: Theme) => void;
  currentTheme: Theme;
  resolvedTheme: Omit<Theme, 'system'>;
}

export interface AppStore {
  appVersion: string;
  language: any;
  isInitialApp: boolean;
  timeFormat: TimeFormat;
  fontSize: ViewFontSize;
  initializeFirstLaunchStatus: () => Promise<Nullable<ISODateString>>;
  firstLaunchDate: Nullable<ISODateString>;
  onLanguageChange: (language: any) => void;
  onFontSizeChange: (fontSize: ViewFontSize) => void;
  onTimeFormatChange: (timeFormat: TimeFormat) => void;
}

export type UserStore = WithState<
  {
    userInfo: UserInfo;
    draftUserName: string;
    signUp: (userName: string) => void;
    onUserInfoChange: (newUserInfo: NewUserInfo) => void;
    onDraftUserNameChange: (userName: string) => void;
  },
  LoadingState
>;

export interface StepProgressStore {
  totalSteps: number;
  currentStep: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  isLastStep: boolean;
  progress: number;
}

export interface DateStore {
  selectedYear: number;
  selectedMonth: Nullable<ISOMonthString>;
  selectedDate: ISODateString;
  currentYear: number;
  currentMonth: number;
  currentDate: Date;
  onSelectedYearChange: (year: number) => void;
  onSelectedMonthChange: (month: Nullable<ISOMonthString>) => void;
  onSelectedDateChange: (date: ISODateString) => void;
  initSelectedDates: () => void;
}

export interface StatisticsStore {
  journalStats: JournalStats;
  moodStats: MoodStats;
  expressiveMonthStats: ExpressiveMonthStats;
  selectedMonthStats: Nullable<SelectedMonthStats>;
}

export interface ScrollStore {
  scrollPosition: number;
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  resetScroll: () => void;
}

export interface DraftStore {
  draft: Draft;
  initDraft: () => void;
  selection: { start: number; end: number };
  onSelectionChange: (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
  ) => void;
  enhancedInputRef: MutableRefObject<EnhancedTextInputRef | null>;
  onTimeStamp: () => void;
  onMoodChange: (mood: Mood) => void;
  onImageUriChange: () => Promise<Nullable<void>>;
  onContentChange: (content: string) => void;
}
export type StorageStore = WithState<
  {
    journals: Journal[];
    setJournals: Dispatch<SetStateAction<Journal[]>>;
  },
  LoadingState
>;
