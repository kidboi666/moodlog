import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '@/core/constants/storage';
import { ValueOf } from '@/types/common.types';

export class StorageService {
  static async load(key: ValueOf<typeof STORAGE_KEY>) {
    try {
      const dataList = await AsyncStorage.getItem(key);

      return dataList ? JSON.parse(dataList) : [];
    } catch (err) {
      console.error('load failed : ', err);
      throw err;
    }
  }
  // TODO any
  static async save(key: ValueOf<typeof STORAGE_KEY>, data: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error('save failed : ', err);
      throw err;
    }
  }

  static async delete(key: ValueOf<typeof STORAGE_KEY>) {
    try {
      await AsyncStorage.removeItem(key as unknown as string);
    } catch (err) {
      console.error('delete failed : ', err);
      throw err;
    }
  }
}
