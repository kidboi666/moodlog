/**
 * 객체의 밸류들을 배열로 반환
 */
export const castArray = <T>(value: Record<string, T>): T[] => {
  return Object.values(value);
};

/**
 * 객체의 키를 배열로 반환
 */
export const extractKeys = (obj: Record<string, any>): string[] => {
  return Object.keys(obj);
};

/**
 * 배열 또는 단일 값을 받아 항상 단일 값으로 반환
 */
export const toSingle = <T>(value: T | T[]): T => {
  return Array.isArray(value) ? value[0] : value;
};

/**
 * 문자열 앞의 0을 제거하고 숫자로 변환
 */
export const removeLeadingZero = (str: string) => {
  str = String(str);

  if (str.charAt(0) === '0' && str.length > 1) {
    return Number(str.substring(1));
  }

  return Number(str);
};
