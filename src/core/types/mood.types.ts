export enum MoodType {
  HAPPY = 'happy',
  SAD = 'sad',
  ANGRY = 'angry',
  PEACE = 'peace',
}

export enum MoodLevel {
  ZERO = 'zero',
  HALF = 'half',
  FULL = 'full',
}

export type Mood = {
  type: MoodType;
  level: MoodLevel;
};

export type SignatureMood = {
  type: MoodType | string;
  count: number;
  score: number;
};
