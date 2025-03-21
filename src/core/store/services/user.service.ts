import { StorageService } from '@/core/store/services/storage.service';
import { uuid } from 'expo-modules-core';
import { STORAGE_KEY } from '@/core/constants/storage';
import { UserState } from '@/core/store/types/user.types';
import { ISODateString } from '@/types/date.types';

export class UserService extends StorageService {
  static async loadUser() {
    try {
      const userInfo = await this.load(STORAGE_KEY.USER_INFO);
      return userInfo ? userInfo : null;
    } catch (err) {
      throw err;
    }
  }

  static async saveUser(
    userState: UserState,
    userName: string,
  ): Promise<UserState> {
    try {
      const newUser = {
        ...userState,
        id: uuid.v4(),
        userName,
      };
      await this.save(STORAGE_KEY.USER_INFO, newUser);
      return newUser;
    } catch (err) {
      throw err;
    }
  }

  static async saveDaysSinceSignup(
    userState: UserState,
    firstLaunchDate: ISODateString,
  ): Promise<number> {
    try {
      const today = new Date();
      const signupDate = new Date(firstLaunchDate);
      const diffTime = today.getTime() - signupDate.getTime();
      const daysSinceSignup = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const newUserInfo = {
        ...userState,
        daysSinceSignup,
      };
      await this.save(STORAGE_KEY.USER_INFO, newUserInfo);
      return daysSinceSignup;
    } catch (err) {
      throw err;
    }
  }
}
