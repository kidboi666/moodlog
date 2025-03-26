import { StorageService } from '@/core/services/storage.service';
import { uuid } from 'expo-modules-core';
import { STORAGE_KEY } from '@/core/constants/storage';
import { ISODateString } from '@/types/date.types';
import { NewUserInfo, UserInfo } from '@/types/user.types';

export class UserService extends StorageService {
  static async loadUser() {
    try {
      const userInfo = await this.load(STORAGE_KEY.USER_INFO);
      return userInfo ? userInfo : null;
    } catch (err) {
      throw err;
    }
  }

  static async saveNewUser(
    userInfo: UserInfo,
    userName: string,
  ): Promise<UserInfo> {
    try {
      const newUser = {
        ...userInfo,
        id: uuid.v4(),
        userName,
      };
      await this.save(STORAGE_KEY.USER_INFO, newUser);
      return newUser;
    } catch (err) {
      throw err;
    }
  }

  static async saveUser(userInfo: UserInfo, updatedUserInfo: NewUserInfo) {
    try {
      const newUserInfo = {
        ...userInfo,
        ...updatedUserInfo,
      };
      await this.save(STORAGE_KEY.USER_INFO, newUserInfo);
      return newUserInfo;
    } catch (err) {
      throw err;
    }
  }

  static async saveDaysSinceSignup(
    userInfo: UserInfo,
    firstLaunchDate: ISODateString,
  ): Promise<number> {
    try {
      const today = new Date();
      const signupDate = new Date(firstLaunchDate);
      const diffTime = today.getTime() - signupDate.getTime();
      const daysSinceSignup = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const newUserInfo = {
        ...userInfo,
        daysSinceSignup,
      };
      await this.save(STORAGE_KEY.USER_INFO, newUserInfo);
      return daysSinceSignup;
    } catch (err) {
      throw err;
    }
  }
}
