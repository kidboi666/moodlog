import { Journal } from '@/types/journal.types';
import { MoodLevel, MoodType } from '@/types/mood.types';

export const dummyJournals: Journal[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    content:
      '오늘부터 새로운 프로젝트를 시작했다. 팀원들과 킥오프 미팅을 가졌는데, 모두가 열정적이어서 나도 기분이 좋았다.',
    mood: {
      type: MoodType.HAPPY,
      level: MoodLevel.FULL,
    },
    createdAt: '2025-03-01T09:30:00Z',
    localDate: '2025-03-01',
    imageUri: null,
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    content:
      '오늘은 주니어 개발자의 코드를 리뷰해주었다. 그동안 많이 성장한 모습을 보니 뿌듯했다.',
    mood: {
      type: MoodType.PEACE,
      level: MoodLevel.FULL,
    },
    createdAt: '2025-03-01T16:15:00Z',
    localDate: '2025-03-01',
    imageUri: null,
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174003',
    imageUri: null,

    content:
      '오늘은 예상보다 까다로운 버그를 만났다. 여러 시도를 해봤지만 아직 해결하지 못했다.',
    mood: {
      type: MoodType.SAD,
      level: MoodLevel.HALF,
    },
    createdAt: '2025-03-02T11:20:00Z',
    localDate: '2025-03-02',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174004',
    imageUri: null,
    content:
      '이번 주 금요일까지 완료해야 하는 기능이 아직 많이 남았다. 시간이 부족할 것 같아서 스트레스가 심하다.',
    mood: {
      type: MoodType.ANGRY,
      level: MoodLevel.HALF,
    },
    createdAt: '2025-03-03T14:45:00Z',
    localDate: '2025-03-03',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174005',
    imageUri: null,

    content:
      '새로운 기능 개발을 위한 팀 회의를 진행했다. 다양한 의견이 나와서 좋았지만, 결정을 내리기가 쉽지 않았다.',
    mood: {
      type: MoodType.PEACE,
      level: MoodLevel.HALF,
    },
    createdAt: '2025-03-04T10:30:00Z',
    localDate: '2025-03-04',
  },
  // ... 중간 데이터 생략 ...
  {
    id: '123e4567-e89b-12d3-a456-426614174039',
    imageUri: null,

    content:
      '드디어 3개월간 진행했던 프로젝트가 완료됐다. 결과물이 만족스럽고 팀원들과 잘 협력해서 기쁘다.',
    mood: {
      type: MoodType.HAPPY,
      level: MoodLevel.FULL,
    },
    createdAt: '2025-03-19T17:00:00Z',
    localDate: '2025-03-19',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174040',
    imageUri: null,

    content:
      '오늘은 퇴근 후 헬스장에 갔다. 운동하고 나니 스트레스가 풀리는 기분이다.',
    mood: {
      type: MoodType.PEACE,
      level: MoodLevel.HALF,
    },
    createdAt: '2025-03-20T21:15:00Z',
    localDate: '2025-03-20',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440041',
    imageUri: null,

    content:
      '오늘 우리 팀에 새로운 시니어 개발자가 합류했다. 기술적인 대화를 나누면서 많이 배울 수 있을 것 같아 기대된다.',
    mood: {
      type: MoodType.HAPPY,
      level: MoodLevel.FULL,
    },
    createdAt: '2025-03-01T10:00:00Z',
    localDate: '2025-03-01',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440042',
    imageUri: null,

    content:
      '레거시 API의 성능을 개선하는 작업을 진행했다. 응답 시간을 50% 정도 줄일 수 있었다.',
    mood: {
      type: MoodType.PEACE,
      level: MoodLevel.FULL,
    },
    createdAt: '2025-03-03T15:30:00Z',
    localDate: '2025-03-03',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440043',
    imageUri: null,

    content:
      '오늘 진행한 배포가 실패했다. 롤백은 했지만 원인을 아직 찾지 못해 답답하다.',
    mood: {
      type: MoodType.ANGRY,
      level: MoodLevel.FULL,
    },
    createdAt: '2025-03-05T16:45:00Z',
    localDate: '2025-03-05',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440044',
    imageUri: null,

    content:
      '오전 내내 레거시 코드를 리팩토링했다. 깔끔해진 코드를 보니 마음이 편안하다.',
    mood: {
      type: MoodType.PEACE,
      level: MoodLevel.HALF,
    },
    createdAt: '2025-03-08T11:20:00Z',
    localDate: '2025-03-08',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440045',
    imageUri: null,

    content: '급한 이슈 처리로 야근했다. 내일 오전에는 재택근무를 하기로 했다.',
    mood: {
      type: MoodType.SAD,
      level: MoodLevel.HALF,
    },
    createdAt: '2025-03-10T22:15:00Z',
    localDate: '2025-03-10',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440046',
    imageUri: null,

    content:
      '사내 기술 세미나에서 React Native 성능 최적화에 대해 발표했다. 긴장했지만 좋은 피드백을 받았다.',
    mood: {
      type: MoodType.HAPPY,
      level: MoodLevel.FULL,
    },
    createdAt: '2025-03-12T14:00:00Z',
    localDate: '2025-03-12',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440047',
    imageUri: null,

    content:
      '동료와 코드 리뷰 과정에서 의견 충돌이 있었다. 결국 타협점을 찾았지만 불편한 감정이 남았다.',
    mood: {
      type: MoodType.ANGRY,
      level: MoodLevel.HALF,
    },
    createdAt: '2025-03-15T13:30:00Z',
    localDate: '2025-03-15',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440048',
    imageUri: null,

    content:
      '개인 프로젝트를 위해 주말에 카페에서 코딩했다. 생각보다 진도가 잘 나가서 기분이 좋다.',
    mood: {
      type: MoodType.HAPPY,
      level: MoodLevel.HALF,
    },
    createdAt: '2025-03-16T15:45:00Z',
    localDate: '2025-03-16',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440049',
    imageUri: null,

    content:
      '이번 스프린트 회고에서 팀의 생산성이 많이 향상되었다는 평가를 받았다. 다음 스프린트가 기대된다.',
    mood: {
      type: MoodType.PEACE,
      level: MoodLevel.FULL,
    },
    createdAt: '2025-03-18T17:00:00Z',
    localDate: '2025-03-18',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440050',
    imageUri: null,

    content:
      '다음 프로젝트에서 Next.js를 도입하기로 했다. 학습 곡선이 있겠지만 새로운 도전이 설렌다.',
    mood: {
      type: MoodType.HAPPY,
      level: MoodLevel.FULL,
    },
    createdAt: '2025-03-20T11:30:00Z',
    localDate: '2025-03-20',
  },
];
