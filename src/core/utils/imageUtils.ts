import * as ImagePicker from 'expo-image-picker';
import { PermissionStatus } from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const JOURNAL_IMAGES_DIR = FileSystem.documentDirectory
  ? `${FileSystem.documentDirectory}journal_images/`
  : '';

export const saveImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== PermissionStatus.GRANTED) {
    alert('사진을 추가하기 위해선 사진 접근 권한이 필요합니다.');
    return null;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.8,
  });

  if (result.canceled) {
    return null;
  }

  const dirInfo = await FileSystem.getInfoAsync(JOURNAL_IMAGES_DIR);

  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(JOURNAL_IMAGES_DIR, {
      intermediates: true,
    });
  }

  const dateString = new Date().toISOString().split('T')[0];
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const fileExt = result.assets[0].uri.split('.').pop();
  const fileName = `${dateString}-${timestamp}-${randomString}.${fileExt}`;
  const newFilePath = `${JOURNAL_IMAGES_DIR}${fileName}`;

  await FileSystem.copyAsync({
    from: result.assets[0].uri,
    to: newFilePath,
  });

  return newFilePath;
};
