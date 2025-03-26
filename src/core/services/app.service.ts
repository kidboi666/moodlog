import { STORAGE_KEY } from '@/core/constants/storage';
import { Settings } from '@/core/store/types/app.types';
import { Nullable } from '@/types/utill.types';
import { ISODateString } from '@/types/date.types';
import { StorageService } from '@/core/services/storage.service';

export class AppService extends StorageService {
  static async loadSettings(): Promise<Nullable<Settings>> {
    try {
      const settings = await this.load(STORAGE_KEY.SETTINGS);
      return settings ? settings : null;
    } catch (err) {
      throw err;
    }
  }

  static async initSettings(newSettings: Settings): Promise<void> {
    try {
      await this.save(STORAGE_KEY.SETTINGS, newSettings);
    } catch (err) {
      throw err;
    }
  }

  static async saveSetting<K extends keyof Settings>(
    settings: Settings,
    key: K,
    value: Settings[K],
  ): Promise<void> {
    try {
      const newSettings = { ...settings, [key]: value };
      await this.save(STORAGE_KEY.SETTINGS, newSettings);
    } catch (err) {
      throw err;
    }
  }

  static async loadFirstLaunchStatus(): Promise<Nullable<ISODateString>> {
    try {
      const firstLaunchDate = await this.load(STORAGE_KEY.FIRST_LAUNCH);
      return firstLaunchDate ? firstLaunchDate : null;
    } catch (err) {
      throw err;
    }
  }

  static async saveFirstLaunchStatus(
    firstLaunchDate: ISODateString,
  ): Promise<void> {
    try {
      await this.save(STORAGE_KEY.FIRST_LAUNCH, firstLaunchDate);
    } catch (err) {
      throw err;
    }
  }
}
