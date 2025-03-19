import { LoadingState, Nullable, WithState } from '@/core/types/common.types';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from 'react-native';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { EnhancedTextInputRef } from '@/features/write/components/EnhancedTextInput';
import {
  DateCounts,
  ISODateString,
  ISOMonthString,
} from '@/core/types/date.types';
import {
  ExpressiveMonthStats,
  JournalStats,
  MoodStats,
  SelectedMonthStats,
} from '@/core/types/statistic.types';
import { Draft, Journal } from '@/core/types/journal.types';
import { NewUserInfo, UserInfo } from '@/core/types/user.types';
import { Mood } from '@/core/types/mood.types';
import { Theme, TimeFormat, ViewFontSize } from '@/core/types/app.types';

export type ContextName = 'week' | 'entries' | 'statistic' | 'global';

export interface JournalStore {
  journals: Journal[];
  dailyJournals: Journal[] | ISODateString;
  selectedJournal?: Journal;
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
  onSubmittedChange: () => void;
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
  onLocalDateChange: (date: ISODateString) => void;
  onMoodChange: (emotion: Mood) => void;
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
