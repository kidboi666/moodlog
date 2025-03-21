import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '@/core/constants/storage';
import { Settings } from '@/core/store/types/app.types';
import { Nullable } from '@/types/common.types';
import { ISODateString } from '@/types/date.types';

export class AppService {
  static async loadSettings(): Promise<Nullable<Settings>> {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEY.SETTINGS);
      return settings ? JSON.parse(settings) : null;
    } catch (err) {
      console.error('load settings failed');
      throw new Error(err);
    }
  }

  static async saveSettings(settings: Settings): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY.SETTINGS,
        JSON.stringify(settings),
      );
    } catch (err) {
      console.error('save settings failed');
      throw new Error(err);
    }
  }

  static async loadFirstLaunchStatus(): Promise<Nullable<ISODateString>> {
    try {
      const firstLaunchDate = await AsyncStorage.getItem(
        STORAGE_KEY.FIRST_LAUNCH,
      );

      return firstLaunchDate ? JSON.parse(firstLaunchDate) : null;
    } catch (err) {
      console.error('load firstLaunchStatus failed : ', err);
      throw err;
    }
  }

  static async saveFirstLaunchStatus(
    firstLaunchDate: ISODateString,
  ): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY.FIRST_LAUNCH, firstLaunchDate);
    } catch (err) {
      console.error('save firstLaunchStatus failed : ', err);
      throw err;
    }
  }
}
