import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '@/core/constants/storage';
import { ValueOf } from '@/types/common.types';

export class StorageService {
  static async load(key: ValueOf<typeof STORAGE_KEY>) {
    try {
      const dataList = await AsyncStorage.getItem(key);

      return dataList ? JSON.parse(dataList) : null;
    } catch (err) {
      throw err;
    }
  }

  // TODO any
  static async save(key: ValueOf<typeof STORAGE_KEY>, data: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      throw err;
    }
  }

  static async delete(key: ValueOf<typeof STORAGE_KEY>) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (err) {
      throw err;
    }
  }
}
